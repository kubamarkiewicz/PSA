
/* This file has to loaded before app.js */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login" 			        : "dummy-webservice/user_login.json",
        "user_has_access" 		        : "dummy-webservice/user_has_access.json",

        "get_alerts"    		        : "dummy-webservice/get_alerts.json",
        "get_blocked_products" 	        : "dummy-webservice/get_blocked_products.json",

        "get_agvs"                      : "dummy-webservice/get_agvs.json",
        "get_storage_positions"         : "dummy-webservice/get_storage_positions.json",
        "get_storage_position_niches"	: "dummy-webservice/get_storage_position_niches.json",

        "block_products" 		        : "dummy-webservice/block_products.json",
        "unblock_products" 		        : "dummy-webservice/unblock_products.json",

        "get_readers"                   : "dummy-webservice/get_readers.json",
        "select_reader_for_blocking"    : "dummy-webservice/select_reader_for_blocking.json",
        "select_reader_for_unblocking"  : "dummy-webservice/select_reader_for_unblocking.json",

        "block_products_from_file"      : "dummy-webservice/block_products_from_file.json",
        "unblock_products_from_file" 	: "dummy-webservice/unblock_products_from_file.json",

        "receive_products"              : "dummy-webservice/receive_products.json",
        "select_reader_for_receiving"   : "dummy-webservice/select_reader_for_receiving.json",
        "receive_products_from_file"    : "dummy-webservice/receive_products_from_file.json",
        
        "get_actions"                   : "dummy-webservice/get_actions.json",
        "select_reader_for_manual_mode" : "dummy-webservice/select_reader_for_manual_mode.json",
        "select_action"                 : "dummy-webservice/select_action.json",
        "upload_actions_file"           : "dummy-webservice/upload_actions_file.json",

	}

}