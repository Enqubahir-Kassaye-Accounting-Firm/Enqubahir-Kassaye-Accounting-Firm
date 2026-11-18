# fill-review.ps1 - makes a client's Website Review from our Word template and
# approved text, keeping the template's design. Needs Windows and Microsoft Word.
#
#   fill: fill-review.ps1 -Action fill -Template <template.docx> -Doc <client.docx> -Text <review-text.md> [-Replace]
#   pdf:  fill-review.ps1 -Action pdf -Doc <client.docx> -Out <client.pdf>
#
# Nothing is written unless everything is filled. An existing file is never
# overwritten: -Replace keeps it under a dated name.
# Keep this file ASCII: Windows PowerShell 5.1 misreads UTF-8 scripts without a BOM.
param(
  [Parameter(Mandatory)][ValidateSet('fill','pdf')][string]$Action,
  [string]$Template, [string]$Doc, [string]$Text, [string]$Out, [switch]$Replace
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
function Fail($msg) { [Console]::Error.WriteLine("ERROR: $msg"); exit 1 }

if ($Action -eq 'pdf') {
  if (-not (Test-Path -LiteralPath $Doc)) { Fail "Word file not found: $Doc" }
  $word = New-Object -ComObject Word.Application
  try {
    $word.Visible = $false
    $d = $word.Documents.Open((Resolve-Path -LiteralPath $Doc).Path, $false, $true)
    $d.ExportAsFixedFormat([IO.Path]::GetFullPath($Out), 17)
    "Pages: " + $d.ComputeStatistics(2)
    $d.Close([ref]0)
  } finally { $word.Quit(); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word) }
  "PDF: $Out"
  exit 0
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
if (-not (Test-Path -LiteralPath $Template)) { Fail "Template not found: $Template" }
if (-not (Test-Path -LiteralPath $Text)) { Fail "Text file not found: $Text" }
if ((Test-Path -LiteralPath $Doc) -and -not $Replace) { Fail "Already exists, not overwritten: $Doc" }

# ---- read the approved text ----
$fields = @{}; $need = New-Object Collections.ArrayList; $check = New-Object Collections.ArrayList
$errors = New-Object Collections.ArrayList; $list = $null; $lineNo = 0
foreach ($raw in [IO.File]::ReadAllLines((Resolve-Path -LiteralPath $Text).Path, [Text.Encoding]::UTF8)) {
  $lineNo++; $line = $raw.Trim()
  if (-not $line) { continue }
  if ($line -match '^#+\s*(.*)$') {
    $heading = $Matches[1].Trim(); $list = $null
    if ($heading -eq 'What we need') { $list = $need } elseif ($heading -eq 'Please check') { $list = $check }
    continue
  }
  if ($line.StartsWith('- ')) {
    if ($null -eq $list) { [void]$errors.Add("Line ${lineNo}: list item outside 'What we need' or 'Please check'"); continue }
    if ($line.Substring(2) -match '^([^:]+?)\s*:\s*(.+)$') { [void]$list.Add(@($Matches[1], $Matches[2])) }
    else { [void]$errors.Add("Line ${lineNo}: expected '- Topic: text'") }
    continue
  }
  if ($line -match '^([^:]+?)\s*:\s*(.*)$') { $fields[$Matches[1]] = $Matches[2]; continue }
  [void]$errors.Add("Line ${lineNo}: not understood: $line")
}
foreach ($k in 'Business name','Date','Preview link','Reply by','Group','Pages','Structure','Name') {
  if (-not $fields[$k]) { [void]$errors.Add("Missing '${k}:'") }
}
if ($fields['Group'] -and $fields['Group'] -notin 'Telegram','WhatsApp') { [void]$errors.Add("Group must be Telegram or WhatsApp") }
if ($need.Count + $check.Count -eq 0) { [void]$errors.Add("Nothing to ask: both lists are empty") }

# ---- open the template ----
$W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
$zip = [IO.Compression.ZipFile]::OpenRead($Template)
$r = New-Object IO.StreamReader($zip.GetEntry("word/document.xml").Open(), [Text.Encoding]::UTF8)
$xml = New-Object Xml.XmlDocument; $xml.PreserveWhitespace = $true; $xml.LoadXml($r.ReadToEnd())
$r.Close(); $zip.Dispose()
$ns = New-Object Xml.XmlNamespaceManager($xml.NameTable); $ns.AddNamespace("w",$W)
$body = $xml.SelectSingleNode("//w:body",$ns)

function PText($p) { (@($p.SelectNodes(".//w:t",$ns)) | ForEach-Object { $_.InnerText }) -join "" }
function Paras { @($body.SelectNodes("w:p",$ns)) }
function Find($start) { Paras | Where-Object { (PText $_).StartsWith($start) } | Select-Object -First 1 }
function SetPreserve($t) {
  if ($t.Attributes.GetNamedItem("xml:space")) { return }
  $attr = $xml.CreateAttribute("xml","space","http://www.w3.org/XML/1998/namespace")
  $attr.Value = "preserve"; [void]$t.Attributes.Append($attr)
}
# Replace text that Word may have split across several runs.
function ReplaceAcross($p, $find, $with) {
  $runs = @($p.SelectNodes(".//w:r/w:t",$ns))
  $full = ($runs | ForEach-Object { $_.InnerText }) -join ""
  $at = $full.IndexOf($find)
  if ($at -lt 0) { [void]$errors.Add("The template no longer contains: $find"); return }
  $end = $at + $find.Length; $pos = 0; $first = $true
  foreach ($t in $runs) {
    $s = $t.InnerText; $a = $pos; $b = $pos + $s.Length; $pos = $b
    if ($b -le $at -or $a -ge $end) { continue }
    $pre = if ($at -gt $a) { $s.Substring(0, $at - $a) } else { "" }
    $post = if ($end -lt $b) { $s.Substring($end - $a) } else { "" }
    $t.InnerText = $(if ($first) { $pre + $with + $post } else { $pre + $post })
    SetPreserve $t; $first = $false
  }
}
# A bullet is its bold topic, then the text. Formatting comes from the template's bullet.
function SetBullet($p, $topic, $value) {
  $runs = @($p.SelectNodes("w:r",$ns))
  $boldRun = $runs[0]; $plainRun = $runs | Where-Object { -not $_.SelectSingleNode("w:rPr/w:b",$ns) } | Select-Object -First 1
  $bold = $boldRun.CloneNode($true); $plain = $plainRun.CloneNode($true)
  foreach ($c in @($p.ChildNodes)) { if ($c.LocalName -ne 'pPr') { [void]$p.RemoveChild($c) } }
  $t = $bold.SelectSingleNode("w:t",$ns); $t.InnerText = "${topic}:"; SetPreserve $t
  $t = $plain.SelectSingleNode("w:t",$ns); $t.InnerText = " $value"; SetPreserve $t
  [void]$p.AppendChild($bold); [void]$p.AppendChild($plain)
}
function FillList($startsWith, $items) {
  $found = @(Paras | Where-Object { (PText $_).StartsWith($startsWith) })
  if (-not $found.Count) { [void]$errors.Add("The template has no $startsWith lines"); return }
  $anchor = $found[-1]
  foreach ($it in $items) {
    $clone = $found[0].CloneNode($true)
    SetBullet $clone $it[0] $it[1]
    [void]$body.InsertAfter($clone,$anchor); $anchor = $clone
  }
  foreach ($p in $found) { [void]$body.RemoveChild($p) }
}

$rules = Find 'Rules for filling this document'
if (-not $rules) { [void]$errors.Add("This is not the Website Review template") }
if ($errors.Count) {
  [Console]::Error.WriteLine("Nothing was written. Fix these in the text file:")
  foreach ($e in ($errors | Select-Object -Unique)) { [Console]::Error.WriteLine("  - $e") }
  exit 1
}

# ---- fill ----
[void]$body.RemoveChild($rules)
$title = Find '[BUSINESS NAME]'
ReplaceAcross $title '[BUSINESS NAME]' $fields['Business name']
ReplaceAcross $title '[Date]' $fields['Date']
$reply = Find 'Your website preview'
ReplaceAcross $reply '[Vercel link]' $fields['Preview link']
ReplaceAcross $reply '[date, 5 working days]' $fields['Reply by']
ReplaceAcross $reply 'Telegram' $fields['Group']
ReplaceAcross (Find '1. What we need from you') ' One bullet each, saying exactly what and why.' ''
FillList '[Topic]' $need
FillList '[Item]' $check
$read = Find '3. Read the whole site'
ReplaceAcross $read '[list the pages]' $fields['Pages']
ReplaceAcross (Find 'the structure:') '[e.g. no separate testimonials page, no individual project pages]' $fields['Structure']
ReplaceAcross (Find '[Name]') '[Name]' $fields['Name']

# A section with nothing to ask is left out, and the rest are renumbered.
$number = 1
foreach ($s in @(@('1. What we need from you',$need), @('2. Please check and confirm',$check), @('3. Read the whole site',$null))) {
  $head = Find $s[0]
  if ($null -ne $s[1] -and $s[1].Count -eq 0) { [void]$body.RemoveChild($head); continue }
  ReplaceAcross $head ($s[0].Substring(0,2)) "$number."
  $number++
}

# Blank lines from the template only push text onto extra pages.
foreach ($p in Paras) { if (-not (PText $p).Trim() -and -not $p.SelectSingleNode(".//w:drawing",$ns) -and -not $p.SelectSingleNode(".//w:sectPr",$ns)) { [void]$body.RemoveChild($p) } }

# Amharic stretches get Ebrima, which ships with Windows and spaces Ethiopic letters properly.
$ethiopic = '([\u1200-\u137F]+(?:[\s\u1361-\u1368]+[\u1200-\u137F]+)*[\u1361-\u1368]*)'
foreach ($run in @($body.SelectNodes(".//w:r[w:t]",$ns))) {
  $t = $run.SelectSingleNode("w:t",$ns)
  if ($t.InnerText -notmatch '[\u1200-\u137F]') { continue }
  $anchor = $run
  foreach ($part in [regex]::Split($t.InnerText, $ethiopic)) {
    if (-not $part) { continue }
    $piece = $run.CloneNode($true)
    $pt = $piece.SelectSingleNode("w:t",$ns); $pt.InnerText = $part; SetPreserve $pt
    if ($part -match '[\u1200-\u137F]') {
      $rPr = $piece.SelectSingleNode("w:rPr",$ns)
      if (-not $rPr) { $rPr = $xml.CreateElement("w","rPr",$W); [void]$piece.PrependChild($rPr) }
      foreach ($old in @($rPr.SelectNodes("w:rFonts",$ns))) { [void]$rPr.RemoveChild($old) }
      $fonts = $xml.CreateElement("w","rFonts",$W)
      foreach ($a in 'ascii','hAnsi','eastAsia','cs') { [void]$fonts.SetAttribute($a,$W,"Ebrima") }
      [void]$rPr.PrependChild($fonts)
    }
    [void]$run.ParentNode.InsertAfter($piece,$anchor); $anchor = $piece
  }
  [void]$run.ParentNode.RemoveChild($run)
}

# ---- nothing from the template may be left ----
foreach ($p in Paras) {
  foreach ($left in '[BUSINESS NAME]','[Date]','[Vercel link]','[date, 5 working days]','[Topic]','[Item]','[list the pages]','[e.g.','[Name]','/new-client') {
    if ((PText $p).Contains($left)) { [void]$errors.Add("Left in the document: $left") }
  }
}
if ($errors.Count) {
  [Console]::Error.WriteLine("Nothing was written:")
  foreach ($e in ($errors | Select-Object -Unique)) { [Console]::Error.WriteLine("  - $e") }
  exit 1
}

# ---- save: build a temporary copy, then swap it in ----
$tmp = "$Doc.tmp"
Copy-Item -LiteralPath $Template -Destination $tmp -Force
$zip = [IO.Compression.ZipFile]::Open($tmp, 'Update')
$zip.GetEntry("word/document.xml").Delete()
$sw = New-Object IO.StreamWriter($zip.CreateEntry("word/document.xml").Open(), (New-Object Text.UTF8Encoding($false)))
$xml.Save($sw); $sw.Close()
# The template's footer has a wrong title. Every other template's footer names its document.
foreach ($entry in @($zip.Entries | Where-Object { $_.FullName -match '^word/footer\d*\.xml$' })) {
  $name = $entry.FullName
  $fr = New-Object IO.StreamReader($entry.Open(), [Text.Encoding]::UTF8)
  $fx = $fr.ReadToEnd(); $fr.Close()
  if ($fx.Contains('What is we write about')) {
    $entry.Delete()
    $fw = New-Object IO.StreamWriter($zip.CreateEntry($name).Open(), (New-Object Text.UTF8Encoding($false)))
    $fw.Write($fx.Replace('What is we write about', 'Website Review')); $fw.Close()
  }
}
$zip.Dispose()
if (Test-Path -LiteralPath $Doc) {
  $old = $Doc -replace '\.docx$', (" (old " + (Get-Date -Format 'yyyy-MM-dd HHmm') + ").docx")
  Move-Item -LiteralPath $Doc -Destination $old
  "Kept the previous file as: $old"
}
Move-Item -LiteralPath $tmp -Destination $Doc
"Filled: $Doc"
