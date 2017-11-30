app.controller('MaestroArticulosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval, exportUiGridService, uiGridExporterConstants, uiGridExporterService) {  

    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Ref', type: 'numberStr', sort: { direction: 'asc', priority: 0 }},
            {field: 'Pasillo', type: 'numberStr'},
            {field: 'Alveolo', type: 'numberStr'},
            {field: 'PiezasPorPallet', type: 'numberStr'},
            {field: 'MinPiezas', type: 'numberStr'},
            {field: 'MaxPiezas', type: 'numberStr'},
            {field: 'MinPallets', type: 'numberStr'},
            {field: 'MaxPallets', type: 'numberStr'},
            {field: 'RefCofor', type: 'numberStr'},
            {field: 'NombreSocial', type: 'numberStr'},
            {field: 'Cmj', type: 'numberStr', displayName: 'CMJ'},
            {field: 'BloqueoAutomatico', type: 'numberStr', displayName: 'Bloqueo Automático'},
            {field: 'TipoPalletName', type: 'numberStr', displayName: 'Tipo Pallet'}
        ],
        enableRowSelection: true, 
        enableRowHeaderSelection: false, 
        modifierKeysToMultiSelect: false,
        enableFiltering: true,
        multiSelect: false,
    };

    $scope.selectedItem = null;

    $scope.gridOptions.onRegisterApi = function(gridApi)
    {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            $scope.selectedItem = row.isSelected ? row.entity : null;
            if (!row.isSelected) {
                // reset form and disable error messages
                $scope.articleForm.$setPristine();
                $scope.articleForm.$setUntouched();
            }
            else {
                $scope.selectedItem.New = false;
            }
        });
    };

    $scope.loadArticlesData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_get_articles
        })
        .then(function(response) {
            $scope.gridOptions.data = response.data.get_articlesResult;
            $scope.displayTiposPalletData();
        });
    }
    $scope.loadArticlesData();

    
    $scope.updateRow = function()
    {
        $('button.update').attr("disabled", true).addClass('loading');

        // delete $scope.selectedItem.$$hashKey;

        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_save_article,
            params  : {
                "Id"                : $scope.selectedItem.Id,
                "Ref"               : $scope.selectedItem.Ref,
                "Pasillo"           : $scope.selectedItem.Pasillo,
                "Alveolo"           : $scope.selectedItem.Alveolo,
                "PiezasPorPallet"   : $scope.selectedItem.PiezasPorPallet,
                "MinPiezas"         : $scope.selectedItem.MinPiezas,
                "MinPallets"        : $scope.selectedItem.MinPallets,
                "MaxPiezas"         : $scope.selectedItem.MaxPiezas,
                "MaxPallets"        : $scope.selectedItem.MaxPallets,
                "ProveedorId"       : $scope.selectedItem.ProveedorId,
                "Cmj"               : $scope.selectedItem.Cmj,
                "BloqueoAutomatico" : $scope.selectedItem.BloqueoAutomatico,
                "TipoPallet"        : $scope.selectedItem.TipoPallet
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["save_articleResult"].Message);
            if (response.data["save_articleResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.update').attr("disabled", false).removeClass('loading');
            $scope.selectedItem = null;
            $scope.loadArticlesData();

            // reset form and disable error messages
            $scope.articleForm.$setPristine();
            $scope.articleForm.$setUntouched();
        });
    }

    
    $scope.deleteRow = function()
    {
        if (!confirm("Estas seguro que quieres suprimir este artucÍulo?")) {
            return;
        }

        $('button.delete').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_delete_article,
            params  : {
                "Id"    : $scope.selectedItem.Id
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["delete_articleResult"].Message);
            if (response.data["delete_articleResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.delete').attr("disabled", false).removeClass('loading');
            $scope.selectedItem = null;
            $scope.loadArticlesData();

            // reset form and disable error messages
            $scope.articleForm.$setPristine();
            $scope.articleForm.$setUntouched();
        });
    }

    
    $scope.addRow = function()
    {
        $scope.selectedItem = {"Id":"0"};

        console.log(!$scope.selectedItem || ($scope.selectedItem.Id && $scope.selectedItem.Id == '0'));

        setTimeout(function(){ 
            $('input[name=ref]').focus();
        }, 30);
        
    }


    $scope.loadProveedoresData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_get_proveedores
        })
        .then(function(response) {
            $scope.proveedoresData = response.data.get_proveedoresResult;
        });
    }
    $scope.loadProveedoresData();



    $scope.loadTiposPalletData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_get_tipos_pallet
        })
        .then(function(response) {
            $scope.tiposPalletData = response.data.get_tipos_palletResult;
            $scope.displayTiposPalletData();
        });
    }
    $scope.loadTiposPalletData();


    $scope.displayTiposPalletData = function() 
    {
        if (!$scope.tiposPalletData) {
            return;
        }

        var tipos = {};
        for (i in $scope.tiposPalletData) {
            tipos[$scope.tiposPalletData[i].Id] = $scope.tiposPalletData[i];
        }

        // display tipos pallet names in the grid
        for (i in $scope.gridOptions.data) {
            $scope.gridOptions.data[i].TipoPalletName = tipos[$scope.gridOptions.data[i]['TipoPallet']]['Nombre'];
        }
    }


    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };




    /*global XLSX */
    var X = XLSX;

    var do_file = (function() 
    {
        var rABS = false;
        var use_worker = false;

        var xw = function xw(data, cb) {
            var worker = new Worker(XW.worker);
            worker.onmessage = function(e) {
                switch(e.data.t) {
                    case 'ready': break;
                    case 'e': console.error(e.data.d); break;
                    case XW.msg: cb(JSON.parse(e.data.d)); break;
                }
            };
            worker.postMessage({d:data,b:rABS?'binary':'array'});
        };

        return function do_file(files) 
        {
            rABS = false;
            use_worker = false;
            var f = files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
                var data = e.target.result;
                if(!rABS) data = new Uint8Array(data);
                if(use_worker) xw(data, process_wb);
                else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
            };
            reader.readAsArrayBuffer(f);
        };
    })();


    var process_wb = (function() {
        var OUT = document.getElementById('out');
        var HTMLOUT = document.getElementById('htmlout');

        var get_format = (function() {
            var radios = document.getElementsByName( "format" );
            return function() {
                for(var i = 0; i < radios.length; ++i) if(radios[i].checked || radios.length === 1) return radios[i].value;
            };
        })();

        var to_json = function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName]);
                if(roa.length) result[sheetName] = roa;
            });
            return JSON.stringify(result, 2, 2);
        };

        var to_csv = function to_csv(workbook) {
            var result = [];
            workbook.SheetNames.forEach(function(sheetName) {
                var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                if(csv.length){
                    result.push("SHEET: " + sheetName);
                    result.push("");
                    result.push(csv);
                }
            });
            return result.join("\n");
        };

        var to_fmla = function to_fmla(workbook) {
            var result = [];
            workbook.SheetNames.forEach(function(sheetName) {
                var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
                if(formulae.length){
                    result.push("SHEET: " + sheetName);
                    result.push("");
                    result.push(formulae.join("\n"));
                }
            });
            return result.join("\n");
        };

        var to_html = function to_html(workbook) {
            HTMLOUT.innerHTML = "";
            workbook.SheetNames.forEach(function(sheetName) {
                var htmlstr = X.write(workbook, {sheet:sheetName, type:'binary', bookType:'html'});
                HTMLOUT.innerHTML += htmlstr;
            });
            return "";
        };

        return function process_wb(wb) {
            global_wb = wb;
            var output = to_json(wb);
            // console.log(output);
            $.post({
                url     : config.webservice.urls.maestro_articles_import_excel,
                data    : {
                    excel: output
                }
            })
            .done(function(data) {
                $('#importButton').attr("disabled", false).removeClass('loading');

                $rootScope.toast.content(data["import_excelResult"].Message);
                if (data["import_excelResult"].Result === true) {
                    $rootScope.toast.toastClass('toast-success');
                }
                else {
                    $rootScope.toast.toastClass('toast-error');
                }
                $mdToast.show($rootScope.toast);

                $scope.loadArticlesData();
            });
            $('#fileInput').val('');
        };
    })();


    $scope.selectFile = function()
    {
        $('#importButton').attr("disabled", true).addClass('loading');
        $('#fileInput').click();
    }

    var xlf = document.getElementById('fileInput');
    if(!xlf.addEventListener) return;
    xlf.addEventListener('change', handleFile, false);


    function handleFile(e) 
    { 
        do_file(e.target.files); 
    }


});