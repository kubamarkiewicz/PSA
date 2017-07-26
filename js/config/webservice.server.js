
/* Rename this file to "webservice.js" */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login"                    : "http://192.168.0.82:8888/SAS/Login/api/user_login",
        "user_has_access"               : "http://192.168.0.82:8888/SAS/Login/api/user_has_access",

        "get_alerts"                    : "http://192.168.0.82:8888/SAS/Data/api/get_alerts",
        "get_blocked_products"          : "http://192.168.0.82:8888/SAS/Data/api/get_blocked_products",
        "data_get_popup_alerts"         : "http://192.168.0.82:8888/SAS/Data/api/get_popup_alerts",

        "get_agvs"                      : "http://192.168.0.82:8888/SAS/Process/api/get_agvs",
        "get_storage_positions"         : "http://192.168.0.82:8888/SAS/Process/api/get_storage_positions",
        "get_storage_position_niches"   : "http://192.168.0.82:8888/SAS/Process/api/get_storage_position_niches",
        "get_semaphores"                : "http://192.168.0.82:8888/SAS/Process/api/get_semaphores",
        "update_semaphore"              : "http://192.168.0.82:8888/SAS/Process/api/update_semaphore",
        "get_transport_belts"           : "http://192.168.0.82:8888/SAS/Process/api/get_transport_belts",
        "update_transport_belt"         : "http://192.168.0.82:8888/SAS/Process/api/update_transport_belt",
        "process_get_popup_alerts"      : "http://192.168.0.82:8888/SAS/Process/api/get_popup_alerts",

        "blockings_get_blocked_products": "http://192.168.0.82:8888/SAS/Lockings/api/get_blocked_products",
        "block_products"                : "http://192.168.0.82:8888/SAS/Lockings/api/block_products",
        "unblock_products"              : "http://192.168.0.82:8888/SAS/Lockings/api/unblock_products",

        "get_readers_for_receiving"     : "http://192.168.0.82:8888/SAS/Reception/api/get_readers",
        "receive_products"              : "http://192.168.0.82:8888/SAS/Reception/api/receive_products",
        "select_reader_for_receiving"   : "http://192.168.0.82:8888/SAS/Reception/api/select_reader",
        "get_reading_for_receiving"     : "http://192.168.0.82:8888/SAS/Reception/api/get_reader_reading",
        "receive_products_from_file"    : "http://192.168.0.82:8888/SAS/Reception/api/receive_products_from_file",

        "get_actions"                   : "http://192.168.0.82:8888/SAS/Manual/api/get_actions",
        "select_action"                 : "http://192.168.0.82:8888/SAS/Manual/api/select_action",
        "manual_get_file_actions"       : "http://192.168.0.82:8888/SAS/Manual/api/get_file_actions",
        "upload_actions_file"           : "http://192.168.0.82:8888/SAS/Manual/api/upload_actions_file",
        "manual_get_pdf_actions"        : "http://192.168.0.82:8888/SAS/Manual/api/get_pdf_actions",
        "manual_generate_pdf"           : "http://192.168.0.82:8888/SAS/Manual/api/generate_pdf",

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

    }

}