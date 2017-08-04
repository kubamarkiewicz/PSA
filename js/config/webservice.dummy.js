
/* Rename this file to "webservice.js" */

window.config = window.config || {};

window.config.webservice = {

    "urls" : {

        "user_login"                    : "dummy-webservice/user/user_login.json",
        "user_has_access"               : "dummy-webservice/user/user_has_access.json",

        "get_alerts"                    : "dummy-webservice/proceso/get_alerts.json",
        "get_agvs"                      : "dummy-webservice/proceso/get_agvs.json",
        "get_storage_positions"         : "dummy-webservice/proceso/get_storage_positions.json",
        "get_storage_position_niches"   : "dummy-webservice/proceso/get_storage_position_niches.json",
        "get_semaphores"                : "dummy-webservice/proceso/get_semaphores.json",
        "update_semaphore"              : "dummy-webservice/empty.json",
        "get_transport_belts"           : "dummy-webservice/proceso/get_transport_belts.json",
        "update_transport_belt"         : "dummy-webservice/empty.json",

        "blockings_get_blocked_products": "dummy-webservice/bloqueos/get_blocked_products.json",
        "block_products"                : "dummy-webservice/bloqueos/block_products.json",
        "unblock_products"              : "dummy-webservice/bloqueos/unblock_products.json",

        "get_parameters"                : "dummy-webservice/parameters/get_parameters.json",
        "save_parameters"               : "dummy-webservice/parameters/save_parameters.json",

        "informes_get_actions"          : "dummy-webservice/informes/get_actions.json",
        "informes_generate_informe"     : "dummy-webservice/informes/generate_informe.json",

        "maestro_articles_get_articles" : "dummy-webservice/maestro-articles/get_articles.json",
        "maestro_articles_save_articles": "dummy-webservice/maestro-articles/save_articles.json",

        "enter_Lockings"                : "dummy-webservice/empty.json",
        "enter_Process"                 : "dummy-webservice/empty.json",
        "enter_Parameters"              : "dummy-webservice/empty.json",
        "enter_Login"                   : "dummy-webservice/empty.json",
        "enter_Informes"                : "dummy-webservice/empty.json",

        "exit_Lockings"                 : "dummy-webservice/empty.json",
        "exit_Process"                  : "dummy-webservice/empty.json",
        "exit_Parameters"               : "dummy-webservice/empty.json",
        "exit_Informes"                 : "dummy-webservice/empty.json"

    }

}