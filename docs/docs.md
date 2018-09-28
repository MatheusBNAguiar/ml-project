## Modules

<dl>
<dt><a href="#module_parse">parse</a></dt>
<dd></dd>
<dt><a href="#module_parse/normalize">parse/normalize</a></dt>
<dd><p>The module used to normalize data</p>
</dd>
<dt><a href="#module_Files">Files</a></dt>
<dd><p>Some util functions to manipulate files</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parseHTML">parseHTML(htmlFile)</a> ⇒ <code><a href="#ParsedData">ParsedData</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#HtmlData">HtmlData</a></dt>
<dd><p>A object containing</p>
</dd>
<dt><a href="#ParsedData">ParsedData</a></dt>
<dd><p>A number, or a string containing a number.</p>
</dd>
</dl>

<a name="module_parse"></a>

## parse
<a name="module_parse..parseFiles"></a>

### parse~parseFiles(rootPath) ⇒ <code>Array</code>
It does get the archives, through the recursive file function, and then
pass it through the parser, storing in an array and then returning the
array with all the parsed data

**Kind**: inner method of [<code>parse</code>](#module_parse)  

| Param | Type | Description |
| --- | --- | --- |
| rootPath | <code>String</code> | The root path that the project is located |

<a name="module_parse/normalize"></a>

## parse/normalize
The module used to normalize data

<a name="module_parse/normalize..removeBreakLineContent"></a>

### parse/normalize~removeBreakLineContent(textArray) ⇒ <code>Array</code>
**Kind**: inner method of [<code>parse/normalize</code>](#module_parse/normalize)  

| Param | Type |
| --- | --- |
| textArray | <code>\*</code> | 

<a name="module_Files"></a>

## Files
Some util functions to manipulate files


* [Files](#module_Files)
    * [~recFindByExt(basePath, [extRegex], files, result)](#module_Files..recFindByExt) ⇒ <code>Array.&lt;PathString&gt;</code>
    * [~readAndReturnFileText(filePath)](#module_Files..readAndReturnFileText) ⇒ <code>String</code>
    * [~readAndProcessJsonResult(mainPath)](#module_Files..readAndProcessJsonResult) ⇒ <code>Array.&lt;JSON&gt;</code>
    * [~writeTempResult(mainPath, resultArray)](#module_Files..writeTempResult)
    * [~writeCSVResult(mainPath, resultArray)](#module_Files..writeCSVResult)
    * [~PathString](#module_Files..PathString) : <code>String</code>

<a name="module_Files..recFindByExt"></a>

### Files~recFindByExt(basePath, [extRegex], files, result) ⇒ <code>Array.&lt;PathString&gt;</code>
Get archives paths on recursive mode, filtering if it has the regex pattern

**Kind**: inner method of [<code>Files</code>](#module_Files)  
**Returns**: <code>Array.&lt;PathString&gt;</code> - The result compilation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| basePath | <code>PathString</code> |  | The basePath |
| [extRegex] | <code>RegExp</code> | <code>&#x27;*&#x27;</code> | The entity regex used to recognize which archives are useful to the processing algorithm |
| files | <code>Array.&lt;PathString&gt;</code> |  | The files that will be used as the base for the recursive process |
| result | <code>Array.&lt;PathString&gt;</code> |  | All the absolute paths of the files that enter on the pattern |

<a name="module_Files..readAndReturnFileText"></a>

### Files~readAndReturnFileText(filePath) ⇒ <code>String</code>
Get the file data and return it as a text

**Kind**: inner method of [<code>Files</code>](#module_Files)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>PathString</code> | The file path |

<a name="module_Files..readAndProcessJsonResult"></a>

### Files~readAndProcessJsonResult(mainPath) ⇒ <code>Array.&lt;JSON&gt;</code>
Get the JSON file data and return it as an array of JSONs

**Kind**: inner method of [<code>Files</code>](#module_Files)  

| Param | Type | Description |
| --- | --- | --- |
| mainPath | <code>PathString</code> | The file path |

<a name="module_Files..writeTempResult"></a>

### Files~writeTempResult(mainPath, resultArray)
Get a chunk of JSONs and then write it on a .json file located on ./temp

**Kind**: inner method of [<code>Files</code>](#module_Files)  

| Param | Type | Description |
| --- | --- | --- |
| mainPath | <code>PathString</code> | The file path |
| resultArray | <code>Array.&lt;JSON&gt;</code> | The array containing a chunk of JSONs |

<a name="module_Files..writeCSVResult"></a>

### Files~writeCSVResult(mainPath, resultArray)
Get a chunk of JSONs and then write it on a .csv file located on ./temp

**Kind**: inner method of [<code>Files</code>](#module_Files)  

| Param | Type | Description |
| --- | --- | --- |
| mainPath | <code>PathString</code> | The file path |
| resultArray | <code>Array.&lt;JSON&gt;</code> | The array containing a chunk of JSONs |

<a name="module_Files..PathString"></a>

### Files~PathString : <code>String</code>
The absolute path directing to the validated archive

**Kind**: inner typedef of [<code>Files</code>](#module_Files)  
<a name="parseHTML"></a>

## parseHTML(htmlFile) ⇒ [<code>ParsedData</code>](#ParsedData)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| htmlFile | <code>String</code> | All stringified data on the html file |

<a name="HtmlData"></a>

## HtmlData
A object containing

**Kind**: global typedef  
**Properties**

| Name |
| --- |
| parsedHTML | 
| parsedHTML | 

<a name="ParsedData"></a>

## ParsedData
A number, or a string containing a number.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
|  | [<code>HtmlData</code>](#HtmlData) |  |
| parsedHTML | [<code>HtmlData</code>](#HtmlData) |  |
| groupedText | <code>String</code> | All the text, without attributes and tags, concatenated |

