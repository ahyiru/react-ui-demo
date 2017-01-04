# css

## 1.背景

	background-attachment /*背景图像是否固定或随着页面的奇遇部分滚动 fixed*/
	background-color
	background-image      /*url("xxx.jpg")*/
	background-repeat     /*设置背景图片是否及如何重复 repeat no-repeat repeat-x repat-y*/
	background-position   /*center center   50% 50%   100px 100px*/

## 2.文本

	color            /*颜色*/
	derection        /*文本方向*/
	line-height      /*行高*/
	letter-spacing   /*字符间距*/
	text-align       /*对齐元素中的文本  center left right  */
	text-decoration  /*向文本添加修饰*/
	text-indent      /*缩进元素中文本的首行 2em  -2em  16px  -16px*/
	text-transform   /*元素中的字符  单词首字母大写capitalize 全小写lowercase 全大写uppercase*/
	white-space      /*元素中空白的处理方式*/
	word-spacing     /*字间距*/
	text-shadow      /*文本阴影  2px 2px 5px green  阴影距左位置 阴影距上位置 阴影清晰度的设置[模糊半径blur] 背景颜色*/
	text-wrap        /*需配合长宽使用  正常换行normal*/

## 3.字体

	font-family
	font-size     /*20px*/
	font-style    /*字体风格*/
	font-variant  /*以小型大写字体或正常字体显示文本*/
	font-weight   /*设置字体的粗细 */
	
	//引用自定义字体文件
	@font-face {
	    font-family: myfont;
	    src:url("字体文件的路径");
	}
	p {
	    font-family: myfont;
	}

## 4.a标记

	a:link {text-decoration:none;...}
	a:hover {}
	a:active {}
	a:visited {}

## 5.列表

	ul li{
	    list-style:circle;   /*简写列表项设置 */
	    /*list-style-type: circle;  列表类型  空心圆效果 */
	    /*list-style-image:url("image1.jpg");  列表项图片位置 */
	    /*list-style-position:inherit; /*inherit inside outside */
	}

## 6.表格

	border:1px solid blue;    /*边框*/
	border-left:0;
	border-collapse:collapse; /*单线折叠边框*/
	width:400px;
	background-color:brown;

## 7.轮廓

	outline        /*设置轮廓属性*/
	outline-color  /*轮廓颜色*/
	outline-style  /*轮廓样式*/
	outline-width  /*轮廓宽度*/

## 8.选择器

	根据部分属性值选择：
	如果需要根据属性值中的词列表的某个词进行选择，则需要使用波浪号（~）。
	假设您想选择 class 属性中包含 important 的元素，可以用下面这个选择器做到这一点：
	p[class~="important"] {color: red;} 
	如果忽略了波浪号，则说明需要完成完全值匹配。
	
	
	部分值属性选择器与点号类名记法的区别：
	该选择器等价于我们在类选择器中讨论过的点号类名记法。
	也就是说，p.important 和 p["important"] 应用到 HTML 文档时是等价的。
	那么，为什么还要有 "~=" 属性选择器呢？因为它能用于任何属性，而不只是 class。
	例如，可以有一个包含大量图像的文档，其中只有一部分是图片。对此，可以使用一个基于 title 文档的部分属性选择器，只选择这些图片：
	img[title~="Figure"] {border: 1px solid gray;}
	这个规则会选择 title 文本包含 "Figure" 的所有图像。没有 title 属性或者 title 属性中不包含 "Figure" 的图像都不会匹配。
	
	
	子串匹配属性选择器
	下面为您介绍一个更高级的选择器模块，它是 CSS2 完成之后发布的，其中包含了更多的部分值属性选择器。
	按照规范的说法，应该称之为“子串匹配属性选择器”。很多现代浏览器都支持这些选择器，包括 IE7。
	下表是对这些选择器的简单总结：
	类型              描述
	------------------------------------------------------
	[abc^="def"]    选择 abc 属性值以 "def" 开头的所有元素
	[abc$="def"]   选择 abc 属性值以 "def" 结尾的所有元素
	[abc*="def"]    选择 abc 属性值中包含子串 "def" 的所有元素
	------------------------------------------------------
	可以想到，这些选择有很多用途。
	举例来说，如果希望对指向 W3School 的所有链接应用样式，不必为所有这些链接指定 class，再根据这个类编写样式，而只需编写以下规则：
	a[href*="w3school.com.cn"] {color: red;}

