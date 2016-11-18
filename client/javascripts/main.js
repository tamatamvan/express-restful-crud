$(document).ready(function() {
  getAll();
})

function getAll() {
  //GET ALL DATA ITEM
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/memo",
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded',
    success: function(data) {
      console.log(data);
      var memos ='';
      var deleteModals = '';
      for (var i = 0; i < data.length; i++) {
        memos += `
        <div id="memo${data[i]._id}" class="list-group">
          <a data-toggle="collapse" href="#collapseExample${data[i]._id}" aria-expanded="false" aria-controls="collapseExample" class="list-group-item" id="title${data[i]._id}">${data[i].title}</a>
          <div id="collapseExample${data[i]._id}" class="panel panel-defaul collapse">
            <div class="panel-body">
              <p id="message${data[i]._id}">${data[i].message}</p>
            </div>
            <div class="panel-footer">
              <div class="btn-group btn-group-justified"><a onclick="editMemo('${data[i]._id}')" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-edit"></i> Edit</a>
              <a data-toggle="modal" data-target="#modalDelete${data[i]._id}" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</a></div>
            </div>
          </div>
        </div>`
        deleteModals +=  `<div id="modalDelete${data[i]._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal fade">
          <div role="document" class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                <h4 id="myModalLabel" class="modal-title">Delete Memo</h4>
              </div>
              <div class="modal-body">Are you sure want to delete this '${data[i].title}' memo?</div>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteMemo('${data[i]._id}')">Delete</button>
              </div>
            </div>
          </div>
        </div>`
      }
      $('#memolist').append(memos)
      $('body').append(deleteModals)
    }
  })
}

function postNewMemo() {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/api/memo",
    dataType: "json",
    data: {
      title: $('#MemoTitle').val(),
      message: $('#MemoContent').val()
    },
    contentType: "application/x-www-form-urlencoded",
    success: function(data){
      var memo = `<div id="memo${data._id}" class="list-group"><a data-toggle="collapse" href="#collapseExample${data._id}" aria-expanded="false" aria-controls="collapseExample" class="list-group-item" id="title${data._id}">${data.title}</a>
        <div id="collapseExample${data._id}" class="panel panel-defaul collapse">
          <div class="panel-body">
            <p id="message${data._id}">${data.message}</p>
          </div>
          <div class="panel-footer">
            <div class="btn-group btn-group-justified">
            <a onclick="editMemo('${data._id}')" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-edit"></i> Edit</a>
            <a data-toggle="modal" data-target="#modalDelete${data._id}" class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i> Delete</a></div>
          </div>
        </div>
      </div>`;
      var deletemodal = `<div id="modalDelete${data._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" class="modal fade">
        <div role="document" class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
              <h4 id="myModalLabel" class="modal-title">Delete Memo</h4>
            </div>
            <div class="modal-body">Are you sure want to delete this '${data.title}' memo?</div>
            <div class="modal-footer">
              <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteMemo('${data._id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
      $('#memolist').append(memo);
      clearForm();
    }
  })
}

function editMemo(id) {
  // $('#MemoId').show();
  $('#submitMemo').hide();
  $('#updateMemo').show();
  var titlenya = document.getElementById(`title${id}`).innerHTML;
  var messagenya = document.getElementById(`message${id}`).innerHTML;
  document.getElementById('MemoTitle').innerHTML = titlenya;
  document.getElementById('MemoContent').innerHTML = messagenya;
  document.getElementById('MemoID').innerHTML = id;
  // console.log(titlenya);
  // $('#submitMemo').hide();
  // $('#updateMemo').show();
}

function updateMemo() {
  console.log();
  $.ajax({
    url         : 'http://localhost:3000/api/memo/'+ $('#MemoID').val(),
    type        : 'PUT',
    dataType    : 'json',
    data        : {
      title: $('#MemoTitle').val(),
      message: $('#MemoContent').val()
    },
    contentType : 'application/x-www-form-urlencoded',
    success     : function(data) {
      console.log(data);
      var newtitle = data.title;
      var newmessage = data.message;
      document.getElementById(`title${data._id}`).innerHTML = newtitle;
      document.getElementById(`message${data._id}`).innerHTML = newmessage;
      clearForm();
    }
  })
}

function deleteMemo(id) {
  $.ajax({
    url         : 'http://localhost:3000/api/memo/'+id,
    type        : 'DELETE',
    dataType    : 'json',
    contentType : 'application/x-www-form-urlencoded',
    success     : function() {
      console.log(id);
      $(`#memo${id}`).remove();
    }
  })
}

function clearForm() {
  $('MemoID').val('');
  $('#MemoTitle').val('');
  $('#MemoContent').val('');
}
// getAll()
