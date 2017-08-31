
/* Rename this file to "webservice.js" */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login"                    : "http://192.168.8.102:8888/PSA/Login/api/user_login",
        "user_has_access"               : "http://192.168.8.102:8888/PSA/Login/api/user_has_access",

        "get_alerts"                    : "http://192.168.8.102:8888/PSA/Data/api/get_alerts",
        "get_agvs"                      : "http://192.168.8.102:8888/PSA/Data/api/get_agvs.php",
        "get_storage_positions"         : "http://192.168.8.102:8888/PSA/Data/api/get_storage_positions",
        "get_storage_position_niches"   : "http://192.168.8.102:8888/PSA/Data/api/get_storage_position_niches",
        "get_semaphores"                : "http://192.168.8.102:8888/PSA/Data/api/get_semaphores",
        "update_semaphore"              : "http://192.168.8.102:8888/PSA/Data/api/update_semaphore",
        "get_transport_belts"           : "http://192.168.8.102:8888/PSA/Data/api/get_transport_belts",
        "update_transport_belt"         : "http://192.168.8.102:8888/PSA/Data/api/update_transport_belt",

        "blockings_get_blocked_products": "http://192.168.8.102:8888/PSA/Lockings/api/get_blocked_products",
        "block_products"                : "http://192.168.8.102:8888/PSA/Lockings/api/block_products",
        "unblock_products"              : "http://192.168.8.102:8888/PSA/Lockings/api/unblock_products",

        "get_parameters"                : "http://192.168.8.102:8888/PSA/Parameters/api/get_parameters",
        "save_parameters"               : "http://192.168.8.102:8888/PSA/Parameters/api/save_parameters",

        "informes_get_actions"          : "http://192.168.8.102:8888/PSA/Informs/api/get_actions",
        "informes_generate_informe"     : "http://192.168.8.102:8888/PSA/Informs/api/generate_informe",

        "maestro_articles_get_articles" : "http://192.168.8.102:8888/PSA/Informs/api/get_articles",
        "maestro_articles_save_article" : "http://192.168.8.102:8888/PSA/Informs/api/save_article",
        "maestro_articles_delete_article" : "http://192.168.8.102:8888/PSA/Informs/api/delete_article",

        "ordenes_en_curso_get_orders"   : "http://192.168.8.102:8888/PSA/CurrentOrders/api/get_orders",
        "ordenes_en_curso_delete_order" : "http://192.168.8.102:8888/PSA/CurrentOrders/api/delete_order",

        "ordenes_completadas_get_orders"   : "http://192.168.8.102:8888/PSA/CompletedOrders/api/get_orders",

        "logs_get_log_cameras"          : "",
        "logs_get_log_production"       : "",

        "enter_Lockings"                : "http://192.168.8.102:8888/PSA/Lockings/api/enter_Lockings",
        "enter_Process"                 : "http://192.168.8.102:8888/PSA/Process/api/enter_Process",
        "enter_Parameters"              : "http://192.168.8.102:8888/PSA/Parameters/api/enter_Parameters",
        "enter_Login"                   : "http://192.168.8.102:8888/PSA/Login/api/enter_Login",
        "enter_Informes"                : "http://192.168.8.102:8888/PSA/Informs/api/enter_Informes",
        "enter_MeastroArticulos"        : "dummy-webservice/empty.json",
        "enter_CurrentOrders"           : "dummy-webservice/empty.json",
        "enter_CompletedOrders"         : "dummy-webservice/empty.json",
        "enter_Logs"                    : "dummy-webservice/empty.json",

        "exit_Lockings"                 : "http://192.168.8.102:8888/PSA/Lockings/api/exit_Lockings",
        "exit_Process"                  : "http://192.168.8.102:8888/PSA/Process/api/exit_Process",
        "exit_Parameters"               : "http://192.168.8.102:8888/PSA/Parameters/api/exit_Parameters",
        "exit_Informes"                 : "http://192.168.8.102:8888/PSA/Informs/api/exit_Informes",
        "exit_MeastroArticulos"         : "dummy-webservice/empty.json",
        "exit_CurrentOrders"            : "dummy-webservice/empty.json",
        "exit_CompletedOrders"          : "dummy-webservice/empty.json",
        "exit_Logs"                     : "dummy-webservice/empty.json"

    }

}