# mvselect.js
Javascript code that incorporates and replaces a select with a nice list, multiple selectable,
with the option of adding the title of the option, add subtitle and an image.

## Getting Started

By simply placing the js in your project you will have a very nice select with the 
option to search for your elements.

You need to place the css in your head and the script in the body to start.
```
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>mvselect</title>
	<link rel="stylesheet" href="mvselect.css">
</head>

```
You only need to place your select with the mvselect-active class in a container 
with the mvselect class to activate the change.
```
<body>

  <div class="mvselect">
    <select class="mvselect-active">
      <option value="Sophia">Sophia Jackson</option>
      <option value="Emma">Emma Jackson</option>
      <option value="Isabella">Isabella Jackson</option>
    </select>
  </div>
  
  <div class="mvselect">
    <select class="mvselect-active">
      <option value="Mike" data-icon="lib/img/persona1.jpg" data-subtitle="Admin">Mike</option>
      <option value="Mariana" data-icon="lib/img/persona2.jpg" data-subtitle="Admin">Mariana</option>
      <option value="Elisa" data-icon="lib/img/persona4.jpg" data-subtitle="User">Elisa</option>
    </select>
  </div>
  
  <script src="lib/mvselect.js"></script>
</body>
```
