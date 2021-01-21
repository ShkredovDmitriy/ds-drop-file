var $form = $("#formFileUpload");

var isAdvancedUpload = (function() {
  var div = document.createElement("div");
  return (
    ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
    "FormData" in window &&
    "FileReader" in window
  );
})();

if (isAdvancedUpload) {
  $form.addClass("has-advanced-upload");

  $form
    .on("drag dragstart dragend dragover dragenter dragleave drop", function(
      e
    ) {
      e.preventDefault();
      e.stopPropagation();
    })
    .on("dragover dragenter", function() {
      $form.addClass("is-dragover");
    })
    .on("dragleave dragend drop", function() {
      $form.removeClass("is-dragover");
    })
    .on("drop", function(e) {
      let droppedFiles = e.originalEvent.dataTransfer.files;
      if (droppedFiles.length === 1) {
        $("#formFileUploadFile").prop("files", droppedFiles);
        $(".file-drop-new-name").html(droppedFiles[0].name);
      }
    });
}

$("#formFileUploadFile").on("change", e => {
  let droppedFiles = e.originalEvent.target.files;
  if (droppedFiles.length === 1) {
    $(".file-drop-new-name").html(droppedFiles[0].name);
    console.log(droppedFiles);
  }
});
