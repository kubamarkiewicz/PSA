
/* This file has to loaded before app.js */

window.config = window.config || {};

window.config.webservice = {

	"urls" : {

        "user_login" 			: "dummy-webservice/user_login.json",
        "user_has_access" 		: "dummy-webservice/user_has_access.json",

        "get_alerts"    		: "dummy-webservice/get_alerts.json",
        "get_blocked_products" 	: "dummy-webservice/get_blocked_products.json",

        "get_agvs" 				: "dummy-webservice/get_agvs.php",

        "block_products" 		: "dummy-webservice/block_products.json",
        "unblock_products" 		: "dummy-webservice/unblock_products.json"

	}

}