## file
##### .babelrc
	{
	  "presets": ["react", "es2015", "stage-0"],
	  "plugins": [
	    "transform-runtime",
	    "transform-decorators-legacy",
	    "lodash",
	    "antd"
	  ],
	  "env": {
	    "development": {
	      "presets": ["react-hmre"]
	    }
	  }
	}
##### .editorconfig
	root = true
	
	[*]
	indent_style = space
	indent_size = 2
	end_of_line = lf
	charset = utf-8
	trim_trailing_whitespace = true
	insert_final_newline = true
	
	[*.md]
	trim_trailing_whitespace = false	
##### .eslintignore
	**/node_modules
	server.js
	webpack.*.js
##### .eslintrc
	{
	  "ecmaFeatures": {
	    "jsx": true,
	    "modules": true
	  },
	  "env": {
	    "browser": true,
	    "node": true
	  },
	  "parser": "babel-eslint",
	  "rules": {
	    "quotes": [2, "single"],
	    "strict": [2, "never"],
	    "babel/generator-star-spacing": 1,
	    "babel/new-cap": 1,
	    "babel/object-shorthand": 1,
	    "babel/arrow-parens": 1,
	    "babel/no-await-in-loop": 1,
	    "react/jsx-uses-react": 2,
	    "react/jsx-uses-vars": 2,
	    "react/react-in-jsx-scope": 2
	  },
	  "plugins": [
	    "babel",
	    "react"
	  ]
	}