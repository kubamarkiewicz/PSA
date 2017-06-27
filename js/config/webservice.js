
/* This file has to loaded before app.js */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login" 			        : "dummy-webservice/user_login.json",
        "user_has_access" 		        : "dummy-webservice/user_has_access.json",

        "get_alerts"                    : "dummy-webservice/get_alerts.json",
        "get_blocked_products" 	        : "dummy-webservice/get_blocked_products.json",
        "get_popup_alerts"              : "dummy-webservice/get_popup_alerts.json",

        "get_agvs"                      : "dummy-webservice/get_agvs.php",
        "get_storage_positions"         : "dummy-webservice/get_storage_positions.json",
        "get_storage_position_niches"   : "dummy-webservice/get_storage_position_niches.json",
        "get_semaphores"                : "dummy-webservice/get_semaphores.json",
        "get_transport_belts"	        : "dummy-webservice/get_transport_belts.json",

        "block_products" 		        : "dummy-webservice/block_products.json",
        "unblock_products" 		        : "dummy-webservice/unblock_products.json",

        "get_readers_for_blocking"      : "dummy-webservice/get_readers.json",
        "select_reader_for_blocking"    : "dummy-webservice/select_reader_for_blocking.json",
        "select_reader_for_unblocking"  : "dummy-webservice/select_reader_for_unblocking.json",

        "block_products_from_file"      : "dummy-webservice/block_products_from_file.json",
        "unblock_products_from_file" 	: "dummy-webservice/unblock_products_from_file.json",

        "get_readers_for_receiving"     : "dummy-webservice/get_readers.json",
        "receive_products"              : "dummy-webservice/receive_products.json",
        "select_reader_for_receiving"   : "dummy-webservice/select_reader_for_receiving.json",
        "get_reader_reading"            : "dummy-webservice/get_reader_reading.json",
        "receive_products_from_file"    : "dummy-webservice/receive_products_from_file.json",
        
        "get_readers_for_manual_mode"   : "dummy-webservice/get_readers.json",
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
        "user_login"                    : "http://192.168.0.82:8888/SAS/Login/api/user_login",
        "user_has_access"               : "http://192.168.0.82:8888/SAS/Login/api/user_has_access",

        "get_alerts"                    : "http://192.168.0.82:8888/SAS/Data/api/get_alerts",
        "get_blocked_products"          : "http://192.168.0.82:8888/SAS/Data/api/get_blocked_products",
        "get_popup_alerts"              : "http://192.168.0.82:8888/SAS/Data/api/get_popup_alerts",

        "get_agvs"                      : "http://192.168.0.82:8888/SAS/Process/api/get_agvs",
        "get_storage_positions"         : "http://192.168.0.82:8888/SAS/Process/api/get_storage_positions",
        "get_storage_position_niches"   : "http://192.168.0.82:8888/SAS/Process/api/get_storage_position_niches",
        "get_semaphores"                : "http://192.168.0.82:8888/SAS/Process/api/get_semaphores",
        "get_transport_belts"           : "http://192.168.0.82:8888/SAS/Process/api/get_transport_belts",

        "block_products"                : "http://192.168.0.82:8888/SAS/Lockings/api/block_products",
        "unblock_products"              : "http://192.168.0.82:8888/SAS/Lockings/api/unblock_products",

        "get_readers_for_blocking"      : "http://192.168.0.82:8888/SAS/Lockings/api/get_readers",
        "select_reader_for_blocking"    : "http://192.168.0.82:8888/SAS/Lockings/api/select_reader_for_blocking",
        "select_reader_for_unblocking"  : "http://192.168.0.82:8888/SAS/Lockings/api/select_reader_for_unblocking",
        "block_products_from_file"      : "http://192.168.0.82:8888/SAS/Lockings/api/block_products_from_file",
        "unblock_products_from_file"    : "http://192.168.0.82:8888/SAS/Lockings/api/unblock_products_from_file",

        "get_readers_for_receiving"     : "http://192.168.0.82:8888/SAS/Reception/api/get_readers",
        "receive_products"              : "http://192.168.0.82:8888/SAS/Reception/api/receive_products",
        "select_reader_for_receiving"   : "http://192.168.0.82:8888/SAS/Reception/api/select_reader_for_receiving",
        "get_reader_reading"            : "http://192.168.0.82:8888/SAS/Reception/api/get_reader_reading",
        "receive_products_from_file"    : "http://192.168.0.82:8888/SAS/Reception/api/receive_products_from_file",

        "get_readers_for_manual_mode"   : "http://192.168.0.82:8888/SAS/Manual/api/get_readers",
        "get_actions"                   : "http://192.168.0.82:8888/SAS/Manual/api/get_actions",
        "select_reader_for_manual_mode" : "http://192.168.0.82:8888/SAS/Manual/api/select_reader_for_manual_mode",
        "select_action"                 : "http://192.168.0.82:8888/SAS/Manual/api/select_action",
        "upload_actions_file"           : "http://192.168.0.82:8888/SAS/Manual/api/upload_actions_file",

        "get_parameters"                : "http://192.168.0.82:8888/SAS/Parameters/api/get_parameters",
        "save_parameters"               : "http://192.168.0.82:8888/SAS/Parameters/api/save_parameters",

        "enter_Data"                    : "http://192.168.0.82:8888/SAS/Data/api/enter_Data",
        "enter_Reception"               : "http://192.168.0.82:8888/SAS/Reception/api/enter_Reception",
        "enter_Lockings"                : "http://192.168.0.82:8888/SAS/Lockings/api/enter_Lockings",
        "enter_Manual"                  : "http://192.168.0.82:8888/SAS/Manual/api/enter_Manual",
        "enter_Process"                 : "http://192.168.0.82:8888/SAS/Process/api/enter_Process",
        "enter_Parameters"              : "http://192.168.0.82:8888/SAS/Parameters/api/enter_Parameters",
        "enter_Login"                   : "http://192.168.0.82:8888/SAS/Login/api/enter_Login",

        "exit_Data"                     : "http://192.168.0.82:8888/SAS/Data/api/exit_Data",
        "exit_Reception"                : "http://192.168.0.82:8888/SAS/Reception/api/exit_Reception",
        "exit_Lockings"                 : "http://192.168.0.82:8888/SAS/Lockings/api/exit_Lockings",
        "exit_Manual"                   : "http://192.168.0.82:8888/SAS/Manual/api/exit_Manual",
        "exit_Process"                  : "http://192.168.0.82:8888/SAS/Process/api/exit_Process",
        "exit_Parameters"               : "http://192.168.0.82:8888/SAS/Parameters/api/exit_Parameters",

*/
	}

}