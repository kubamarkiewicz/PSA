
/* Rename this file to "webservice.js" */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login"                    : "http://192.168.0.82:8888/SAS/Login/api/user_login",
        "user_has_access"               : "http://192.168.0.82:8888/SAS/Login/api/user_has_access",

        "get_alerts"                    : "http://192.168.0.82:8888/SAS/Data/api/get_alerts",
        "get_agvs"                      : "http://192.168.0.82:8888/SAS/Process/api/get_agvs",
        "get_storage_positions"         : "http://192.168.0.82:8888/SAS/Process/api/get_storage_positions",
        "get_storage_position_niches"   : "http://192.168.0.82:8888/SAS/Process/api/get_storage_position_niches",
        "get_semaphores"                : "http://192.168.0.82:8888/SAS/Process/api/get_semaphores",
        "update_semaphore"              : "http://192.168.0.82:8888/SAS/Process/api/update_semaphore",
        "get_transport_belts"           : "http://192.168.0.82:8888/SAS/Process/api/get_transport_belts",
        "update_transport_belt"         : "http://192.168.0.82:8888/SAS/Process/api/update_transport_belt",

        "blockings_get_blocked_products": "http://192.168.0.82:8888/SAS/Lockings/api/get_blocked_products",
        "block_products"                : "http://192.168.0.82:8888/SAS/Lockings/api/block_products",
        "unblock_products"              : "http://192.168.0.82:8888/SAS/Lockings/api/unblock_products",

        "get_parameters"                : "http://192.168.0.82:8888/SAS/Parameters/api/get_parameters",
        "save_parameters"               : "http://192.168.0.82:8888/SAS/Parameters/api/save_parameters",

        "informes_get_actions"          : "dummy-webservice/informes_get_actions.json",
        "informes_generate_informe"     : "dummy-webservice/informes_generate_informe.json",

        "maestro_articles_get_articles" : "dummy-webservice/maestro-articles/get_articles.json",
        "maestro_articles_save_articles": "dummy-webservice/maestro-articles/save_articles.json",

        "enter_Lockings"                : "http://192.168.0.82:8888/SAS/Lockings/api/enter_Lockings",
        "enter_Process"                 : "http://192.168.0.82:8888/SAS/Process/api/enter_Process",
        "enter_Parameters"              : "http://192.168.0.82:8888/SAS/Parameters/api/enter_Parameters",
        "enter_Login"                   : "http://192.168.0.82:8888/SAS/Login/api/enter_Login",
        "enter_Informes"                : "dummy-webservice/empty.json",

        "exit_Lockings"                 : "http://192.168.0.82:8888/SAS/Lockings/api/exit_Lockings",
        "exit_Process"                  : "http://192.168.0.82:8888/SAS/Process/api/exit_Process",
        "exit_Parameters"               : "http://192.168.0.82:8888/SAS/Parameters/api/exit_Parameters",,
        "exit_Informes"                 : "dummy-webservice/empty.json"

    }

}