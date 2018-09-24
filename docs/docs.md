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

