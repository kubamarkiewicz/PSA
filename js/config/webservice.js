
/* This file has to loaded before app.js */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login" 			        : "dummy-webservice/user_login.json",
        "user_has_access" 		        : "dummy-webservice/user_has_access.json",

        "get_alerts"    		        : "dummy-webservice/get_alerts.json",
        "get_blocked_products" 	        : "dummy-webservice/get_blocked_products.json",

        "get_agvs"                      : "dummy-webservice/get_agvs.php",
        "get_storage_positions"         : "dummy-webservice/get_storage_positions.json",
        "get_storage_position_niches"   : "dummy-webservice/get_storage_position_niches.json",
        "get_semaphores"                : "dummy-webservice/get_semaphores.json",
        "get_transport_belts"	        : "dummy-webservice/get_transport_belts.json",

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

        "get_parameters"                : "dummy-webservice/get_parameters.json",
        "save_parameters"               : "dummy-webservice/save_parameters.json",

        "enter_Data"                    : "dummy-webservice/enter_Data.json",
        "enter_Reception"               : "dummy-webservice/enter_Reception.json",
        "enter_Lockings"                : "dummy-webservice/enter_Lockings.json",
        "enter_Manual"                  : "dummy-webservice/enter_Manual.json",
        "enter_Process"                 : "dummy-webservice/enter_Process.json",
        "enter_Parameters"              : "dummy-webservice/enter_Parameters.json",
        "enter_Login"                   : "dummy-webservice/enter_Login.json",

        "exit_Data"                     : "dummy-webservice/exit_Data.json",
        "exit_Reception"                : "dummy-webservice/exit_Reception.json",
        "exit_Lockings"                 : "dummy-webservice/exit_Lockings.json",
        "exit_Manual"                   : "dummy-webservice/exit_Manual.json",
        "exit_Process"                  : "dummy-webservice/exit_Process.json",
        "exit_Parameters"               : "dummy-webservice/exit_Parameters.json",



/*
        "user_login"                    : "http://192.168.0.63:8888/PSA/Login/api/user_login",
        "user_has_access"               : "http://192.168.0.63:8888/PSA/Login/api/user_has_access",

        "get_alerts"                    : "http://192.168.0.63:8888/PSA/Data/api/get_alerts",
        "get_blocked_products"          : "http://192.168.0.63:8888/PSA/Data/api/get_blocked_products",

        "get_agvs"                      : "dummy-webservice/get_agvs.json",
        "get_storage_positions"         : "dummy-webservice/get_storage_positions.json",
        "get_storage_position_niches"   : "dummy-webservice/get_storage_position_niches.json",
        "get_semaphores"                : "dummy-webservice/get_semaphores.json",
        "get_transport_belts"           : "dummy-webservice/get_transport_belts.json",

        "block_products"                : "http://192.168.0.63:8888/PSA/Lockings/api/block_products",
        "unblock_products"              : "http://192.168.0.63:8888/PSA/Lockings/api/unblock_products",

        "get_readers"                   : "http://192.168.0.63:8888/PSA/Lockings/api/get_readers",
        "select_reader_for_blocking"    : "http://192.168.0.63:8888/PSA/Lockings/api/select_reader_for_blocking",
        "select_reader_for_unblocking"  : "http://192.168.0.63:8888/PSA/Lockings/api/select_reader_for_unblocking",

        "block_products_from_file"      : "http://192.168.0.63:8888/PSA/Lockings/api/block_products_from_file",
        "unblock_products_from_file"    : "http://192.168.0.63:8888/PSA/Lockings/api/unblock_products_from_file",

        "receive_products"              : "http://192.168.0.63:8888/PSA/Reception/api/receive_products",
        "select_reader_for_receiving"   : "http://192.168.0.63:8888/PSA/Reception/api/select_reader_for_receiving",
        "receive_products_from_file"    : "http://192.168.0.63:8888/PSA/Reception/api/receive_products_from_file",

        "get_actions"                   : "http://192.168.0.63:8888/PSA/Manual/api/get_actions",
        "select_reader_for_manual_mode" : "http://192.168.0.63:8888/PSA/Manual/api/select_reader_for_manual_mode",
        "select_action"                 : "http://192.168.0.63:8888/PSA/Manual/api/select_action",
        "upload_actions_file"           : "http://192.168.0.63:8888/PSA/Manual/api/upload_actions_file",

        "get_parameters"                : "dummy-webservice/get_parameters.json",
        "save_parameters"               : "dummy-webservice/save_parameters.json",

        "enter_Data"                    : "dummy-webservice/enter_Data.json",
        "enter_Reception"               : "dummy-webservice/enter_Reception.json",
        "enter_Lockings"                : "dummy-webservice/enter_Lockings.json",
        "enter_Manual"                  : "dummy-webservice/enter_Manual.json",
        "enter_Process"                 : "dummy-webservice/enter_Process.json",
        "enter_Parameters"              : "dummy-webservice/enter_Parameters.json",
        "enter_Login"                   : "dummy-webservice/enter_Login.json",

        "exit_Data"                     : "dummy-webservice/exit_Data.json",
        "exit_Reception"                : "dummy-webservice/exit_Reception.json",
        "exit_Lockings"                 : "dummy-webservice/exit_Lockings.json",
        "exit_Manual"                   : "dummy-webservice/exit_Manual.json",
        "exit_Process"                  : "dummy-webservice/exit_Process.json",
        "exit_Parameters"               : "dummy-webservice/exit_Parameters.json",
*/

	}

}