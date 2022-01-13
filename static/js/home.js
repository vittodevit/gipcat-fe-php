var version_ann;
var version;

var doNotCallModal = document.getElementById('doNotCallModal');
if (doNotCallModal != null) {
    doNotCallModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var idInstallation = button.getAttribute('data-bs-dncIid');
        var modalContent = document.getElementById('dnc.title');
        modalContent.textContent = idInstallation;
        $.ajax({
            type: "GET",
            url: './installations/ajax_get.php',
            data: { "idInstallation": idInstallation },
            success: function (dataget) {
                version = dataget['version'];
            },
            error: function (data) {
                toastr.error(data.responseText);
            }
        });
    });
}

function editInstallationDNC_AJAX(idInstallation){
    $.ajax({
        type: "POST",
        url: './installations/ajax_edit.php',
        data: {
            "idInstallation": idInstallation,
            "version": version,
            "toCall": 0
        },
        success: function (data) {
            successReload();
        },
        error: function (data) {
            toastr.error(data.responseText);
        }
    });
    version = "";
}

var annotationsModal = document.getElementById('annotationsModal');
if (annotationsModal != null) {
    annotationsModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var idIntervention = button.getAttribute('data-bs-amIid');
        $.ajax({
            type: "GET",
            url: './lib/int/ajax_get.php',
            data: { "idIntervention": idIntervention },
            success: function (dataget) {
                version_ann = dataget['version'];
                document.getElementById('am.idIntervention').value = dataget['idIntervention'];
                document.getElementById('am.associatedCallNote').value = dataget['associatedCallNote'];
            },
            error: function (data) {
                toastr.error(data.responseText);
            }
        });
    });
}

function editInterventionCN_AJAX(){
    $.ajax({
        type: "POST",
        url: './lib/int/ajax_edit.php',
        data: {
            "idIntervention": document.getElementById('am.idIntervention').value,
            "version": version_ann,
            "associatedCallNote": document.getElementById('am.associatedCallNote').value
        },
        success: function (data) {
            successReload();
        },
        error: function (data) {
            toastr.error(data.responseText);
        }
    });
    version_ann = "";
}