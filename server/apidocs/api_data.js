define({ "api": [
  {
    "type": "delete",
    "url": "/auth",
    "title": "Sign Out",
    "name": "Sing_Admin_Out",
    "group": "Auth",
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.sign_out",
            "description": "<p>Signed out successfully or not. It will clear token cookie.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Sign In",
    "name": "Sing_In_For_Admin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username or email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The id of user.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>Generated token. Note, this token is also setted within header cookie.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/auth",
    "title": "Sign Up",
    "name": "Sing_Up_New_Admin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username or email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 201": [
          {
            "group": "Success: 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The id of user.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>Generated token. Note, this token is also setted within header cookie.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server/apidocs/main.js",
    "group": "C:\\nginx\\html\\renew-app\\server\\apidocs\\main.js",
    "groupTitle": "C:\\nginx\\html\\renew-app\\server\\apidocs\\main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/groups",
    "title": "Create FB Group",
    "name": "Create_New_Group",
    "group": "Groups",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Facebook group name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL of the Facebook group.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Optional, the description.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 201": [
          {
            "group": "Success: 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The group id.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>The name of the group.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data.url",
            "description": "<p>The fb URL of the group.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": "<p>The description of the group.</p>"
          },
          {
            "group": "Success: 201",
            "type": "Number",
            "optional": false,
            "field": "data.created_at",
            "description": "<p>The timestamp of group creation date.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/groups.js",
    "groupTitle": "Groups"
  },
  {
    "type": "delete",
    "url": "/groups/:group_id",
    "title": "Delete FB Group",
    "name": "Delete_Group",
    "group": "Groups",
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.success",
            "description": "<p>Is deleting process has been performed successfully or not.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/groups.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups/:group_id",
    "title": "Retrieve FB Group",
    "name": "Retrieve_Group",
    "group": "Groups",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "group_id",
            "description": "<p>The id the group you need to retrieve.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The group id.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>The name of the group.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.url",
            "description": "<p>The fb URL of the group.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": "<p>The description of the group.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Number",
            "optional": false,
            "field": "data.created_at",
            "description": "<p>The timestamp of group creation date.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/groups.js",
    "groupTitle": "Groups"
  },
  {
    "type": "get",
    "url": "/groups",
    "title": "Retrieve FB Groups",
    "name": "Retrieve_Groups",
    "group": "Groups",
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>Array of groups. See the GET <code>/groups/:group_id</code> endpoint to know more about the return group object.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/groups.js",
    "groupTitle": "Groups"
  },
  {
    "type": "post",
    "url": "/items",
    "title": "Create Item",
    "name": "Create_New_Item",
    "group": "Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the item.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>The description of the item.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>The fb price of the item.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "photos",
            "description": "<p>Array of photo names of item.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "item",
            "description": "<p>Array of group ids where this item will be share.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 201": [
          {
            "group": "Success: 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object. See the GET <code>/items/:item_id</code> endpoint to know more about the return item object.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/items.js",
    "groupTitle": "Items"
  },
  {
    "type": "delete",
    "url": "/item/:item_id",
    "title": "Delete Item",
    "name": "Delete_Item",
    "group": "Items",
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.success",
            "description": "<p>Is deleting process has been performed successfully or not.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/items.js",
    "groupTitle": "Items"
  },
  {
    "type": "get",
    "url": "/items/:item_id",
    "title": "Retrieve Item",
    "name": "Retrieve_Item",
    "group": "Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item_id",
            "description": "<p>The id the item you need to retrieve.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The item id.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>The title of the item.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": "<p>The description of the item.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Number",
            "optional": false,
            "field": "data.price",
            "description": "<p>The fb price of the item.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Number",
            "optional": false,
            "field": "data.views",
            "description": "<p>Total views.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Array",
            "optional": false,
            "field": "data.photos",
            "description": "<p>Array of photo names of item.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Array",
            "optional": false,
            "field": "data.item",
            "description": "<p>Array of group ids where this item will be share.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Number",
            "optional": false,
            "field": "data.created_at",
            "description": "<p>The timestamp of item creation date.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/items.js",
    "groupTitle": "Items"
  },
  {
    "type": "get",
    "url": "/items",
    "title": "Retrieve Items",
    "name": "Retrieve_Items",
    "group": "Items",
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>Array of items. See the GET <code>/items/:item_id</code> endpoint to know more about the return item object.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/items.js",
    "groupTitle": "Items"
  },
  {
    "type": "put",
    "url": "/items/:item_id",
    "title": "Update Item",
    "name": "Update_Item",
    "group": "Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "item",
            "description": "<p>See POST <code>/items</code> endpoint.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response updated object. See the GET <code>/items/:item_id</code> endpoint to know more about the return item object.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/items.js",
    "groupTitle": "Items"
  }
] });
