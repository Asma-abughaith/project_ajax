$(document).ready(function () {
  const baseUrl = "http://htudemo.local";

  ////////////////////////////////////// login form authentication/////////////////////////////////////////////////////////////////////

  $("#login-form").submit(function (event) {
    event.preventDefault();

    let username = $("#user").val();
    let password = $("#pass").val();

    $.ajax({
      url: baseUrl + "/authenticate",
      type: "post",
      data: {
        username: username,
        password: password,
      },

      success: function (data, status, xhr) {
        data = JSON.parse(data);
        console.log(data);
        console.log(data["status"]);
        if (data.status == "admin") {
          window.location.href = "/users";
        } else if (data.status == "inactive") {
          console.log("Executing else if block with data: 'inactive'");
          console.log("Calling swal.fire()");
          swal
            .fire({
              title: "Incorrect login!",
              text: "you are inactive!",
              icon: "warning",
              showCancelButton: false,
              confirmButtonText: "OK",
            })
            .then((result) => {
              console.log("swal.fire() result:", result);
            });
        } else if (data.status == "user") {
          window.location.href = "/courses";
        } else {
          console.log("Executing else block with data:", data);
          swal.fire({
            title: "Incorrect login!",
            text: "Incorrect username or password!",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }
      },
    });
  });
  //////////////////////////////////////////////////registation ///////////////////////////////////////////////////////
  //validation for password in registation page
  $("#pass").on("input", function () {
    var password = $("#pass").val();
    var requirements = [];

    if (!/[a-z]/.test(password)) {
      requirements.push("<li>A lowercase letter</li>");
    }

    if (!/[A-Z]/.test(password)) {
      requirements.push("<li>An uppercase letter</li>");
    }

    if (!/\d/.test(password)) {
      requirements.push("<li>A number</li>");
    }

    if (!/[$@$!%*?&]/.test(password)) {
      requirements.push("<li>A symbol</li>");
    }

    if (password.length < 8) {
      requirements.push("<li>At least 8 characters</li>");
    }

    if (requirements.length > 0) {
      var message = "Your password must contain the following:";
      message += requirements.join("");
      $("#password-requirements").html(message);
    } else {
      $("#password-requirements").html("");
    }
  });

  $("#create_password").on("input", function () {
    var password = $("#create_password").val();
    var requirements = [];

    if (!/[a-z]/.test(password)) {
      requirements.push("<li>A lowercase letter</li>");
    }

    if (!/[A-Z]/.test(password)) {
      requirements.push("<li>An uppercase letter</li>");
    }

    if (!/\d/.test(password)) {
      requirements.push("<li>A number</li>");
    }

    if (!/[$@$!%*?&]/.test(password)) {
      requirements.push("<li>A symbol</li>");
    }

    if (password.length < 8) {
      requirements.push("<li>At least 8 characters</li>");
    }

    if (requirements.length > 0) {
      var message = "Your password must contain the following:";
      message += requirements.join("");
      $("#password-requirements1").html(message);
    } else {
      $("#password-requirements1").html("");
    }
  });

  //validation for repate the password

  $("#repeat").on("input", function () {
    var repeatPassword = $("#repeat").val();
    var password = $("#pass").val();

    if (repeatPassword !== password) {
      $("#password-match").text("Passwords do not match");
    } else {
      $("#password-match").text("");
    }
  });
  $("#create_repeat").on("input", function () {
    var repeatPassword = $("#rcreate_repeat").val();
    var password = $("#create_password").val();

    if (repeatPassword !== password) {
      $("#password-match1").text("Passwords do not match");
    } else {
      $("#password-match1").text("");
    }
  });

  //ajax for create new user
  $("#signup-form").submit(function (event) {
    event.preventDefault();

    let username = $("#user").val();
    let password = $("#pass").val();
    let email = $("#email").val();
    let repeat = $("#repeat").val();

    $.ajax({
      url: baseUrl + "/sign",
      type: "post",
      data: {
        username: username,
        password: password,
        email: email,
        repeat: repeat,
      },
      success: function (data, status, xhr) {
        data = JSON.parse(data);

        console.log(data);
        console.log(data.status);
        if (data.status == "true") {
          window.location.href = "/";
        } else if (data.status == "matches") {
          swal.fire({
            title: "Incorrect signup!",
            text: "The password didn't match the repeat password!",
            icon: "warning",
          });
        } else if (data.status == "empty") {
          swal.fire({
            title: "Incorrect signup!",
            text: "you should enter all information!",
            icon: "warning",
          });
        } else {
          swal.fire({
            title: "Incorrect signup!",
            text: "The password should meet all requirements!",
            icon: "warning",
          });
        }
      },
    });
  });
  //////////////////////////////////////////////////////////create new user by button///////////////////////////////////////////////////////////////////
  $("#create-user").click(function () {
    $("#create-user-form").show();
    $("#create-subject-form").hide();
    $("#select_sutdent_sub").hide();
    $("#set_mark").hide();
    $(".overlay").show();
  });
  $("#can").click(function () {
    $("#create-user-form").hide();
    $(".overlay").hide();
    $("#create_username").val("");
    $("#create_password").val("");
    $("#create_email").val("");
    $("#create_repeat").val("");
  });
  $("#create-user-form").submit(function (event) {
    event.preventDefault();

    let username = $("#create_username").val();
    let password = $("#create_password").val();
    let email = $("#create_email").val();
    let repeat = $("#create_repeat").val();

    $.ajax({
      url: baseUrl + "/users/create",
      type: "post",
      data: {
        username: username,
        password: password,
        email: email,
        repeat: repeat,
      },
      success: function (data, status, xhr) {
        data = JSON.parse(data);

        console.log(data);
        // console.log(data[0].id);
        console.log(data.status);
        if (data.status == "true") {
          if (data.status == "1") {
            data[0].status = "Active";
          } else {
            data[0].status = "Inactive";
          }
          $("#user_table tbody").append(`
            <tr data-id=${data[0].id}>
              <td class="text-center" username-id=${data[0].id}>${data[0].username}</td>
              <td class="text-center" email-id=${data[0].id}>${data[0].email}</td>
              <td class="text-center" status-id=${data[0].id}>${data[0].status}</td>
              <td edit-id=${data[0].id} class="text-center"><button class="btn btn-outline-warning p-2"><i class="fa-solid fa-edit p-2"></i></button></td>
              <td delete-id=${data[0].id} class="text-center"><button class="btn btn-outline-danger p-2"><i class="fa-solid fa-trash p-2"></i></button></td>
            </tr>     
                     `);
          const newRow = $(`td[status-id="${data[0].id}"]`);
          if (data.status == "Active") {
            newRow.removeClass("red");
            newRow.addClass("green");
          } else {
            newRow.removeClass("green");
            newRow.addClass("red");
          }
        } else if (data.status == "matches") {
          swal.fire({
            title: "Incorrect signup!",
            text: "The password didn't match the repeat password!",
            icon: "warning",
          });
        } else if (data.status == "empty") {
          swal.fire({
            title: "Incorrect signup!",
            text: "you should enter all information!",
            icon: "warning",
          });
        } else {
          swal.fire({
            title: "Incorrect signup!",
            text: "The password should meet all requirements!",
            icon: "warning",
          });
        }
        $("#search_input").on("input", function () {
          let search = $("#search_input").val();
          $.ajax({
            url: baseUrl + "/users/search",
            type: "post",
            data: {
              search: search,
            },
            success: function (response, status, xhr) {
              // console.log(response);
              // Get the table rows
              let rows = $("#user_table tbody tr");
              let arr = [];
              // Iterate over the rows and filter based on the search results
              rows.each(function (index, row) {
                let firstrow = $(row).find("td:eq(0)").text().toLowerCase();
                let secondrow = $(row).find("td:eq(1)").text().toLowerCase();
                let matchFound = false;

                response.body.forEach(function (user) {
                  console.log(user);
                  if (
                    firstrow.indexOf(user.username.toLowerCase()) !== -1 ||
                    secondrow.indexOf(user.email.toLowerCase()) !== -1
                  ) {
                    matchFound = true;
                    arr.push("1");
                    return false;
                  }
                });

                if (matchFound) {
                  $(row).show();
                } else {
                  $(row).hide();
                }
              });
              if (arr.length == 0) {
                $("#no-results-row").show();
              } else {
                $("#no-results-row").hide();
              }
            },
            error: function (xhr, status, error) {
              // Handle any errors
              console.log("Error: " + xhr.responseJSON.message_code);
            },
          });
        });
        //edit and delette post
        $(`td[delete-id=${data[0].id}]`).click(function () {
          Swal.fire({
            title: "Are you sure you want to delete this user ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                type: "DELETE",
                url: baseUrl + "/transactions/delete",
                data: JSON.stringify({ id: data[0].id }),
                success: function (response) {
                  $(`tr[data-id="${data[0].id}"]`).remove();
                  Swal.fire(
                    "Deleted!",
                    "the user has been deleted.",
                    "success"
                  );
                },
                error: function () {
                  Swal.fire(
                    "Error",
                    "An error occurred while deleting the user.",
                    "error"
                  );
                },
              });
            }
          });
        });
        $(`td[edit-id=${data[0].id}]`).click(function () {
          $.ajax({
            type: "POST",
            url: baseUrl + "/user/single",
            data: {
              id: data[0].id,
            },
            success: function (response) {
              console.log(response);
              console.log(response.body["email"]);
              Swal.fire({
                title: "Edit the user",
                html:
                  '<input id="username" class="swal2-input" placeholder="username"value="' +
                  response.body["username"] +
                  '">' +
                  '<input id="email" class="swal2-input" placeholder="email" value="' +
                  response.body["email"] +
                  '">' +
                  '<select id="status" class="swal2-select">' +
                  '<option value="' +
                  response.body["status"] +
                  '">select status</option>' +
                  '<option value="1">Active</option>' +
                  '<option value="0">Inactive</option>' +
                  "</select>" +
                  '<select id="role" class="swal2-select">' +
                  '<option value="' +
                  response.body["role"] +
                  '">select Role</option>' +
                  '<option value="admin">Admin</option>' +
                  '<option value="user">user</option>' +
                  "</select>",
                showCancelButton: true,
                confirmButtonText: "Submit",
                preConfirm: () => {
                  return new Promise((resolve) => {
                    // get the form data

                    let username = $("#username").val();
                    let email = $("#email").val();
                    let status = $("#status").val();
                    let role = $("#role").val();

                    // send the AJAX request
                    $.ajax({
                      type: "POST",
                      url: baseUrl + "/transactions/update",
                      data: {
                        id: data[0].id,
                        username: username,
                        email: email,
                        role: role,
                        status: status,
                      },
                      success: function (response) {
                        // response=JSON.stringify(response);
                        // response = JSON.parse(response);
                        if (response.body["status"] == "1") {
                          response.body["status"] = "Active";
                          $(`td[status-id="${data[0].id}"]`).removeClass("red");
                          $(`td[status-id="${data[0].id}"]`).addClass("green");
                        } else {
                          response.body["status"] = "Inactive";
                          $(`td[status-id="${data[0].id}"]`).removeClass(
                            "green"
                          );
                          $(`td[status-id="${data[0].id}"]`).addClass("red");
                        }
                        console.log(response);
                        console.log(response.body["username"]);
                        console.log(response.body["id"]);

                        $(`td[username-id="${data[0].id}"]`).text(
                          response.body["username"]
                        );
                        $(`td[email-id="${data[0].id}"]`).text(
                          response.body["email"]
                        );
                        $(`td[status-id="${data[0].id}"]`).text(
                          response.body["status"]
                        );

                        // update the content of a div with the response from the server

                        // resolve the promise to close the SweetAlert
                        resolve();
                      },
                      error: function () {
                        // handle the error here

                        // reject the promise to keep the SweetAlert open
                        reject(Error("Network Error"));
                      },
                    });
                  });
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log("Form submitted successfully!");
                }
              });
            },
          });
        });
      },
    });
    $("#create-user-form").hide();
    $(".overlay").hide();
    $("#create_username").val("");
    $("#create_password").val("");
    $("#create_email").val("");
    $("#create_repeat").val("");
  });
  ///////////////////////////////////////////////////////get all users///////////////////////////////////////////////////////////
  //get all users in page
  $.ajax({
    type: "GET",
    url: baseUrl + "/transactions",
    success: function (response) {
      response.body.forEach((element) => {
        if (element.status == "1") {
          element.status = "Active";
        } else {
          element.status = "Inactive";
        }
        $("#user_table tbody").append(`
                          <tr data-id=${element.id}>
                              <td class="text-center" username-id=${element.id}>${element.username}</td>
                              <td class="text-center" email-id=${element.id}>${element.email}</td>
                              <td class="text-center" status-id=${element.id}>${element.status}</td>
                              <td edit-id=${element.id} class="text-center"><button class="btn btn-outline-warning p-2"><i class="fa-solid fa-edit p-2"></i></button></td>
                              <td delete-id=${element.id} class="text-center"><button class="btn btn-outline-danger p-2"><i class="fa-solid fa-trash p-2"></i></button></td>
                              </tr>     
                   `);
        const newRow = $(`td[status-id="${element.id}"]`);
        if (element.status == "Active") {
          newRow.removeClass("red");
          newRow.addClass("green");
        } else {
          newRow.removeClass("green");
          newRow.addClass("red");
        }
        $("#search_input").on("input", function () {
          let search = $("#search_input").val();
          $.ajax({
            url: baseUrl + "/users/search",
            type: "post",
            data: {
              search: search,
            },
            success: function (response, status, xhr) {
              // console.log(response);
              // Get the table rows
              let rows = $("#user_table tbody tr");
              let arr = [];
              // Iterate over the rows and filter based on the search results
              rows.each(function (index, row) {
                let firstrow = $(row).find("td:eq(0)").text().toLowerCase();
                let secondrow = $(row).find("td:eq(1)").text().toLowerCase();
                let matchFound = false;

                response.body.forEach(function (user) {
                  console.log(user);
                  if (
                    firstrow.indexOf(user.username.toLowerCase()) !== -1 ||
                    secondrow.indexOf(user.email.toLowerCase()) !== -1
                  ) {
                    matchFound = true;
                    arr.push("1");
                    return false;
                  }
                });

                if (matchFound) {
                  $(row).show();
                } else {
                  $(row).hide();
                }
              });

              if (arr.length == 0) {
                $("#no-results-row").show();
              } else {
                $("#no-results-row").hide();
              }
            },
            error: function (xhr, status, error) {
              // Handle any errors
              console.log("Error: " + xhr.responseJSON.message_code);
            },
          });
        });

        $(`td[delete-id=${element.id}]`).click(function () {
          Swal.fire({
            title: "Are you sure you want to delete this user ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                type: "DELETE",
                url: baseUrl + "/transactions/delete",
                data: JSON.stringify({ id: element.id }),
                success: function (response) {
                  $(`tr[data-id="${element.id}"]`).remove();
                  Swal.fire(
                    "Deleted!",
                    "the user has been deleted.",
                    "success"
                  );
                },
                error: function () {
                  Swal.fire(
                    "Error",
                    "An error occurred while deleting the user.",
                    "error"
                  );
                },
              });
            }
          });
        });
        $(`td[edit-id=${element.id}]`).click(function () {
          $.ajax({
            type: "POST",
            url: baseUrl + "/user/single",
            data: {
              id: element.id,
            },
            success: function (response) {
              console.log(response);
              console.log(response.body["email"]);
              Swal.fire({
                title: "Edit the user",
                html:
                  '<input id="username" class="swal2-input" placeholder="username"value="' +
                  response.body["username"] +
                  '">' +
                  '<input id="email" class="swal2-input" placeholder="email" value="' +
                  response.body["email"] +
                  '">' +
                  '<select id="status" class="swal2-select">' +
                  '<option value="' +
                  response.body["status"] +
                  '">select status</option>' +
                  '<option value="1">Active</option>' +
                  '<option value="0">Inactive</option>' +
                  "</select>" +
                  '<select id="role" class="swal2-select">' +
                  '<option value="' +
                  response.body["role"] +
                  '">select Role</option>' +
                  '<option value="admin">Admin</option>' +
                  '<option value="user">user</option>' +
                  "</select>",
                showCancelButton: true,
                confirmButtonText: "Submit",
                preConfirm: () => {
                  return new Promise((resolve) => {
                    // get the form data

                    let username = $("#username").val();
                    let email = $("#email").val();
                    let status = $("#status").val();
                    let role = $("#role").val();

                    // send the AJAX request
                    $.ajax({
                      type: "POST",
                      url: baseUrl + "/transactions/update",
                      data: {
                        id: element.id,
                        username: username,
                        email: email,
                        role: role,
                        status: status,
                      },
                      success: function (response) {
                        // response=JSON.stringify(response);
                        // response = JSON.parse(response);
                        if (response.body["status"] == "1") {
                          response.body["status"] = "Active";
                          $(`td[status-id="${element.id}"]`).removeClass("red");
                          $(`td[status-id="${element.id}"]`).addClass("green");
                        } else {
                          response.body["status"] = "Inactive";
                          $(`td[status-id="${element.id}"]`).removeClass(
                            "green"
                          );
                          $(`td[status-id="${element.id}"]`).addClass("red");
                        }
                        console.log(response);
                        console.log(response.body["username"]);
                        console.log(response.body["id"]);

                        $(`td[username-id="${element.id}"]`).text(
                          response.body["username"]
                        );
                        $(`td[email-id="${element.id}"]`).text(
                          response.body["email"]
                        );
                        $(`td[status-id="${element.id}"]`).text(
                          response.body["status"]
                        );

                        // update the content of a div with the response from the server

                        // resolve the promise to close the SweetAlert
                        resolve();
                      },
                      error: function () {
                        // handle the error here

                        // reject the promise to keep the SweetAlert open
                        reject(Error("Network Error"));
                      },
                    });
                  });
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log("Form submitted successfully!");
                }
              });
            },
          });
        });
      });
    },
  });
  //////////////////////////////////////////////////////create new subject/////////////////////////////////////////////////////
  $("#create-subject").click(function () {
    $("#create-subject-form").show();
    $("#create-user-form").hide();
    $("#select_sutdent_sub").hide();
    $("#set_mark").hide();
    $(".overlay").show();
  });
  $("#canc").click(function () {
    $("#create-subject-form").hide();
    $(".overlay").hide();
    $("#subject_name").val("");
    $("#pass_mark").val("");
  });

  $("#create-subject-form").submit(function (event) {
    event.preventDefault();

    let name = $("#subject_name").val();
    let mark = $("#pass_mark").val();

    $.ajax({
      url: baseUrl + "/subject/create",
      type: "post",
      data: {
        name: name,
        mark: mark,
      },
      success: function (data, status, xhr) {
        console.log(data.body.name);
        console.log(status);
        // $('#subject_select').append(
        //   `<option value="${data.body.id}">  ${data.body.name}  </option>`
        // )
        Swal.fire({
          title: "success!",
          text: xhr.responseJSON.message_code,
          icon: "success",
          confirmButtonText: "OK",
        });
      },
      error: function (xhr, status, error) {
        // console.log(xhr.responseJSON.message_code)
        Swal.fire({
          title: "Error!",
          text: xhr.responseJSON.message_code,
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
    $("#create-subject-form").hide();
    $(".overlay").hide();
    $("#subject_name").val("");
    $("#pass_mark").val("");
  });
  ////////////////////////////////////////////////////////assign subject to user//////////////////////////////////////////////////
  $("#assign-subject").click(function () {
    $("#select_sutdent_sub").show();
    $("#create-user-form").hide();
    $("#create-subject-form").hide();
    $("#set_mark").hide();
    $(".overlay").show();
  });
  $("#assign_cancel").click(function () {
    $("#select_sutdent_sub").hide();
    $("#subject_select").val("");
    $("#student_select").val("");
    $(".overlay").hide();
  });

  $.ajax({
    url: baseUrl + "/subject/index",
    type: "get",

    success: function (data, status, xhr) {
      console.log(data);
      $("#student_select").append(
        `<option value="" disabled selected>Select a student</option>`
      );

      $("#student_select_mark").append(
        `<option value="" disabled selected>Select a student</option>`
      );

      data.body.student.forEach((element) => {
        console.log(element);
        $("#student_select").append(
          `<option value="${element.id}">  ${element.username}  </option>`
        );

        $("#student_select_mark").append(
          `<option value="${element.id}">  ${element.username}  </option>`
        );
      });
    },
  });

  $("#student_select").on("input", function () {
    let id = $("#student_select").val();
    $.ajax({
      url: baseUrl + "/subject/multi",
      type: "post",
      data: {
        id: id,
      },

      success: function (data, status, xhr) {
        console.log(data.body);
        console.log(status);
        $("#subject_select").append(
          ` <option value="" disabled selected>Select a Subject</option>`
        );
        data.body.forEach((item) => {
          console.log(item);

          $("#subject_select").append(
            `<option value="${item.id}">  ${item.name}  </option>`
          );
        });
      },
    });
    $("#subject_select").text("");
    // $('#create-subject-form').hide();
  });

  $("#select_sutdent_sub").submit(function (event) {
    event.preventDefault();

    let subject_id = $("#subject_select").val();
    let student_id = $("#student_select").val();

    $.ajax({
      url: baseUrl + "/subject/assign",
      type: "post",
      data: {
        subject_id: subject_id,
        student_id: student_id,
      },

      success: function (data, status, xhr) { },
      error: function (xhr, status, error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: xhr.responseJSON.message_code,
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
    $("#select_sutdent_sub").hide();
    $(".overlay").hide();
    $("#subject_select").val("");
    $("#student_select").val("");
  });
  /////////////////////////////////////////////////set student mark//////////////////////////////////
  $("#student_select_mark").on("input", function () {
    let id = $("#student_select_mark").val();
    $.ajax({
      url: baseUrl + "/subject/single",
      type: "post",
      data: {
        id: id,
      },

      success: function (data, status, xhr) {
        console.log(data.body);
        console.log(status);

        data.body.forEach((item) => {
          console.log(item);
          $("#subject_select_mark").append(
            `<option value="${item.id}">  ${item.name}  </option>`
          );
        });
      },
    });
    $("#subject_select_mark").text("");
    $("#create-subject-form").hide();
  });

  $("#set-mark-button").click(function () {
    $("#set_mark").show();
    $("#create-user-form").hide();
    $("#create-subject-form").hide();
    $("#select_sutdent_sub").hide();
    $(".overlay").show();
  });
  $("#mark_cancel").click(function () {
    $("#set_mark").hide();
    $("#subject_select_mark").val("");
    $("#student_select_mark").val("");
    $("#assign_mark").val("");
    $(".overlay").hide();
  });

  $("#set_mark").submit(function (event) {
    event.preventDefault();

    let subject_id = $("#subject_select_mark").val();
    let student_id = $("#student_select_mark").val();
    let student_mark = $("#assign_mark").val();

    $.ajax({
      url: baseUrl + "/subject/mark",
      type: "post",
      data: {
        subject_id: subject_id,
        student_id: student_id,
        student_mark: student_mark,
      },

      success: function (data, status, xhr) { },
      error: function (xhr, status, error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: xhr.responseJSON.message_code,
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
    $("#set_mark").hide();
    $(".overlay").hide();
    $("#subject_select_mark").val("");
    $("#student_select_mark").val("");
    $("#assign_mark").val("");
  });
  /////////////////////////////////////////////chat system//////////////////////////////////////////////////
  $.ajax({
    url: baseUrl + "/chat/user",
    type: "get",

    success: function (data, status, xhr) {
      console.log(data);

      data.body.student.forEach((element) => {
        console.log(element);
        if (element.online == "1") {
          $("#user_for_chat").append(`
          <a data-receiv-id=link-${element.id} href="/chat?receiver_id=${element.id}">
            <li class="list-group-item  d-flex align-items-center">
              <div class="col-3">
                <img src="./resources/image/${element.image}" width="100%"
                height="100%" style="border-radius: 50%;" />
              </div>
              <div class="col-9 ms-2">
                <p class="mb-0 ms-1"> ${element.username}<p>
                <i class='fa fa-circle me-1'></i><span>online</span>
              </div>     
            </li> 
          </a>
         `);
        } else {
          $("#user_for_chat").append(`
            <a data-receiv-id=link-${element.id} href="/chat?receiver_id=${element.id}">
            <li class="list-group-item  d-flex align-items-center">
              <div class="col-3">
                <img src="./resources/image/${element.image}" width="100%"
                height="100%" style="border-radius: 50%;" />
              </div>
              <div class="col-9 ms-2">
                <p class="mb-0 ms-1"> ${element.username}<p>
                <i class='fa fa-circle offline me-1'></i><span>offline</span>
              </div>     
            </li> 
            </a>
          `);
        }
      });
      $("#sending_msg").submit(function (event) {
        event.preventDefault();
        // let receiver_id = element.id;
        let message =  $("#message").val();
        let receiver_id =  $("#my_problem").val();
        $.ajax({
            url: baseUrl + "/chat/create",
            type: "post",
            data: {
                receiver_id: receiver_id,
                message: message
            },
            success: function (data, status, xhr) { // Fixed variable name here
                console.log(data); // Check if 'receiver_id' key is present in the data response
                $('#chat_load').append(`
                <div id="chat_user" class=" mb-2 " style='text-align:left;'>
                                        <img class="image_chat" src="./resources/image/${data.body.sen.image}"
                                        width='7%' height="7%">
                                            <span class="ms-2 user">${data.body.chat.message}</span>
                                            <p style='display:none;'>${data.body.chat.created_at}</p>
                                    </div>
                `);
                
                console.log(status);
                $("#message").val('');
            },
            error: function (xhr, status, error) {
                // console.log(xhr.responseJSON.message_code)
                Swal.fire({
                    title: "Error!",
                    text: xhr.responseJSON.message_code,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    });
    },
  });

  ///////////////////////////////////////////////  Search  //////////////////////////////////////////////////
  // $("#search_input").on("input", function () {
  //   let search = $("#search_input").val();
  //   $.ajax({
  //     url: baseUrl + "/users/search",
  //     type: "post",
  //     data: {
  //       search: search,
  //     },
  //     success: function (response, status, xhr) {
  //       // console.log(response);
  //        // Get the table rows
  //     let rows = $('#user_table tbody tr');

  //     // Iterate over the rows and filter based on the search results
  //     rows.each(function(index, row) {
  //       let firstrow = $(row).find('td:eq(0)').text().toLowerCase();
  //       let secondrow = $(row).find('td:eq(1)').text().toLowerCase();
  //       let matchFound = false;

  //       response.body.forEach(function(user) {
  //         console.log(user)
  //         if (firstrow.indexOf(user.username.toLowerCase()) !== -1 ||
  //         secondrow.indexOf(user.email.toLowerCase()) !== -1) {
  //       matchFound = true;
  //       return false;
  //     }
  //       });

  //       if (matchFound) {
  //         $(row).show();
  //       } else {
  //         $(row).hide();
  //       }
  //     });
  //     },
  //     error: function(xhr, status, error) {
  //       // Handle any errors
  //       console.log('Error: ' + xhr.responseJSON.message_code);
  //     }
  //   });
  // });
  //function filterTable(searchResults) {
  // // Get the table rows
  // let rows = $('#user_table tbody tr');
  // console.log(rows);

  // // Iterate over the rows and filter based on the search results
  // rows.each(function(index, row) {
  //   let firstrow = $(row).find('td:eq(0)').text().toLowerCase();
  //   let secondrow = $(row).find('td:eq(1)').text().toLowerCase();
  //   let matchFound = false;

  //   searchResults.forEach(function(user) {
  //     if (firstrow.indexOf(user.username.toLowerCase()) !== -1 ||
  //     secondrow.indexOf(user.email.toLowerCase()) !== -1) {
  //   matchFound = true;
  //   return false;
  // }
  //   });

  //   if (matchFound) {
  //     $(row).show();
  //   } else {
  //     $(row).hide();
  //   }
  // });
  //}
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  // $('#select_sutdent_sub').submit(function (event) {
  //   event.preventDefault();

  //   let subject_id = $('#subject_select').val();
  //   let student_id = $('#student_select').val();

  //   $.ajax({
  //     url: baseUrl + '/subject/assign',
  //     type: 'post',
  //     data: {
  //       subject_id: subject_id,
  //       student_id: student_id
  //     },

  //     success: function (data, status, xhr) {

  //     }
  //   });
  // })

  // $.ajax({

  //   type: "GET",
  //   url: baseUrl + "/courses/all",
  //   success: function (response) {
  //     console.log(response);
  //     response.body.forEach(element => {
  //       $('#courses').append(`

  //                   <div class="card  col-4  m-auto  mt-2 mb-2 p-3"  data-id=${element['id']}>
  //                   <img src="./resources/image/${element.image}" class="card-img-top " alt="..." height="40%">
  //                     <div class="card-body">
  //                       <h5 class="card-title text-center" name-id=${element.id}>${element.course_name}</h5>
  //                       <p class="card-text text-justify" exert-id=${element.id}>${element.course_exert}</p>
  //                     </div>
  //                     <ul class="list-group list-group-flush">
  //                       <li class="list-group-item" price-id=${element.id}><strong>price:</strong>${element.price}$</li>
  //                       <li class="list-group-item" create-id=${element.id}><strong>created at:</strong>${element.created_at}</li>
  //                       <li class="list-group-item" updated-id=${element.id}><strong>updated at:</strong>${element.updated_at}</li>
  //                     </ul>
  //                     <div class="card-body">
  //                     <button edit-id=${element.id} class="btn btn-outline-warning p-2"><i class="fa-solid fa-edit p-2"></i></button>
  //                     <button delete-id=${element.id} class="btn btn-outline-danger p-2"><i class="fa-solid fa-trash p-2"></i></button>
  //                     </div>
  //                 </div>

  //        `);
  //       //here
  //       $('#course_button').click(function () {
  //         // $('#courses').addClass('overlay');
  //         $('#create').show();
  //         $('#courses').hide();
  //         $('body').css('background-color', '#0000006f');

  //       });

  //       $('#cancel').click(function () {
  //         // $('#courses').addClass('overlay');
  //         $('#create').hide();
  //         $('body').css('background-color', '');
  //         $('#courses').show();

  //       });
  //       $(`button[edit-id=${element.id}]`).click(function () {
  //         $('#edit').show();
  //         $('#courses').hide();
  //         $('body').css('background-color', '#0000006f');

  //         $('#editcancel').click(function () {
  //           // $('#courses').addClass('overlay');
  //           $('#edit').hide();
  //           $('body').css('background-color', '');
  //           $('#courses').show();

  //         });
  //         $.ajax({
  //           type: "POST",
  //           url: baseUrl + "/courses/single",
  //           data: {
  //             id: element.id
  //           },
  //           success: function (response) {
  //             console.log(response.body);

  //             $('#editname').val(response.body['course_name']);
  //             $('#editcourse_exert').val(response.body['course_exert']);
  //             $('#editcourses_details').val(response.body['courses_details']);
  //             $('#editprice').val(response.body['price']);

  //             $('#edit_course').submit(function (event) {
  //               event.preventDefault();

  //               let course_name = $('#editname').val();
  //               let course_exert = $('#editcourse_exert').val();
  //               let courses_details = $('#editcourses_details').val();
  //               let price = $('#editprice').val();

  //               // send the AJAX request
  //               $.ajax({
  //                 type: "POST",
  //                 url: baseUrl + "/courses/update",
  //                 data: {
  //                   id: element.id,
  //                   course_name: course_name,
  //                   course_exert: course_exert,
  //                   courses_details: courses_details,
  //                   price: price

  //                 },
  //                 success: function (response) {
  //                   console.log(response);
  //                   $(`h5[name-id="${element.id}"]`).text(response.body['course_name']);
  //                   $(`p[exert-id="${element.id}"]`).text(response.body['course_exert']);
  //                   $(`li[price-id="${element.id}"]`).text(response.body['price']);
  //                   $(`li[updated-id="${element.id}"]`).text(response.body['updated_at']);
  //                   $(`li[create-id="${element.id}"]`).text(response.body['created_at']);

  //                   $('#edit').hide();
  //                   $('body').css('background-color', '');
  //                   $('#courses').show();

  //                 }
  //               });
  //             });

  //             // get the form data

  //           },

  //         });

  //       })

  //       $(`button[delete-id=${element.id}]`).click(function () {
  //         Swal.fire({
  //           title: 'Are you sure you want to delete this user ?',
  //           text: "You won't be able to revert this!",
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3085d6',
  //           cancelButtonColor: '#d33',
  //           confirmButtonText: 'Yes, delete it!'
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             $.ajax({
  //               type: "DELETE",
  //               url: baseUrl + '/courses/delete',
  //               data: JSON.stringify({ id: element.id }),
  //               success: function (response) {
  //                 console.log(element.id);
  //                 $(`div[data-id="${element.id}"]`).remove();
  //                 Swal.fire(
  //                   'Deleted!',
  //                   'the user has been deleted.',
  //                   'success'
  //                 );
  //               },
  //               error: function () {
  //                 Swal.fire(
  //                   'Error',
  //                   'An error occurred while deleting the user.',
  //                   'error'
  //                 );
  //               }
  //             });
  //           }

  //         })

  //       })

  //     });
  //   }

  // });
  // //create new course
  // $('#creare_course').submit(function (event) {
  //   event.preventDefault();

  //   let course_name = $('#name').val();
  //   let course_exert = $('#course_exert').val();
  //   let courses_details = $('#courses_details').val();
  //   let price = $('#price').val();

  //   $.ajax({
  //     url: baseUrl + '/courses/create',
  //     type: 'post',
  //     data: {
  //       course_name: course_name,
  //       course_exert: course_exert,
  //       courses_details: courses_details,
  //       price: price
  //     },
  //     success: function (data) {
  //       console.log(data.body.course_name);

  //       $('#courses').append(`

  //                     <div class="card  col-4  m-auto  mt-2 mb-2 p-3"  data-id=${data.body['id']}>
  //                     <img src="./resources/image/${data.body.image}" class="card-img-top " alt="..." height="40%">
  //                       <div class="card-body">
  //                         <h5 class="card-title text-center" name-id=${data.body.id}>${data.body.course_name}</h5>
  //                         <p class="card-text text-justify" exert-id=${data.body.id}>${data.body.course_exert}</p>
  //                       </div>
  //                       <ul class="list-group list-group-flush">
  //                         <li class="list-group-item" price-id=${data.body.id}><strong>price:</strong>${data.body.price}$</li>
  //                         <li class="list-group-item" create-id=${data.body.id}><strong>created at:</strong>${data.body.created_at}</li>
  //                         <li class="list-group-item" updated-id=${data.body.id}><strong>updated at:</strong>${data.body.updated_at}</li>
  //                       </ul>
  //                       <div class="card-body">
  //                       <button edit-id=${data.body.id} class="btn btn-outline-warning p-2"><i class="fa-solid fa-edit p-2"></i></button>
  //                       <button delete-id=${data.body.id} class="btn btn-outline-danger p-2"><i class="fa-solid fa-trash p-2"></i></button>
  //                       </div>
  //                   </div>

  //          `);
  //       $('#create').hide();
  //       $('body').css('background-color', '');
  //       $('#courses').show();

  //       //edit the course when i create
  //       $(`button[edit-id=${data.body.id}]`).click(function () {
  //         $('#edit').show();
  //         $('#courses').hide();
  //         $('body').css('background-color', '#0000006f');

  //         $('#editcancel').click(function () {
  //           // $('#courses').addClass('overlay');
  //           $('#edit').hide();
  //           $('body').css('background-color', '');
  //           $('#courses').show();

  //         });
  //         $.ajax({
  //           type: "POST",
  //           url: baseUrl + "/courses/single",
  //           data: {
  //             id: data.body.id
  //           },
  //           success: function (response) {
  //             console.log(response.body);

  //             $('#editname').val(response.body['course_name']);
  //             $('#editcourse_exert').val(response.body['course_exert']);
  //             $('#editcourses_details').val(response.body['courses_details']);
  //             $('#editprice').val(response.body['price']);

  //             $('#edit_course').submit(function (event) {
  //               event.preventDefault();

  //               let course_name = $('#editname').val();
  //               let course_exert = $('#editcourse_exert').val();
  //               let courses_details = $('#editcourses_details').val();
  //               let price = $('#editprice').val();

  //               // send the AJAX request
  //               $.ajax({
  //                 type: "POST",
  //                 url: baseUrl + "/courses/update",
  //                 data: {
  //                   id: data.body.id,
  //                   course_name: course_name,
  //                   course_exert: course_exert,
  //                   courses_details: courses_details,
  //                   price: price

  //                 },
  //                 success: function (response) {
  //                   console.log(response);
  //                   $(`h5[name-id="${data.body.id}"]`).text(response.body['course_name']);
  //                   $(`p[exert-id="${data.body.id}"]`).text(response.body['course_exert']);
  //                   $(`li[price-id="${data.body.id}"]`).text(response.body['price']);
  //                   $(`li[updated-id="${data.body.id}"]`).text(response.body['updated_at']);
  //                   $(`li[create-id="${data.body.id}"]`).text(response.body['created_at']);

  //                   $('#edit').hide();
  //                   $('body').css('background-color', '');
  //                   $('#courses').show();

  //                 }
  //               });
  //             });

  //             // get the form data

  //           },

  //         });

  //       })
  //       //here i finish edit

  //       $(`button[delete-id=${data.body.id}]`).click(function () {
  //         Swal.fire({
  //           title: 'Are you sure you want to delete this user ?',
  //           text: "You won't be able to revert this!",
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3085d6',
  //           cancelButtonColor: '#d33',
  //           confirmButtonText: 'Yes, delete it!'
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             $.ajax({
  //               type: "DELETE",
  //               url: baseUrl + '/courses/delete',
  //               data: JSON.stringify({ id: data.body.id }),
  //               success: function (response) {
  //                 console.log(data.body.id);
  //                 $(`div[data-id="${data.body.id}"]`).remove();
  //                 Swal.fire(
  //                   'Deleted!',
  //                   'the user has been deleted.',
  //                   'success'
  //                 );
  //               },
  //               error: function () {
  //                 Swal.fire(
  //                   'Error',
  //                   'An error occurred while deleting the user.',
  //                   'error'
  //                 );
  //               }
  //             });
  //           }

  //         })

  //       })

  //     }

  //   })
  // })
});
