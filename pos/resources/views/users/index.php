<div class="overlay"></div>
<div class="row d-flex box ">




    <?php if (!empty($_SESSION) && isset($_SESSION['error']) && !empty($_SESSION['error'])) : ?>

    <div class='alert alert-danger container w-50 text-center' role='alert'>
        <?= $_SESSION['error'] ?>
    </div>
    <?php

    $_SESSION['error'] = null;

    endif; ?>



    <div id="dataTableContainer">

        <div class="  d-flex justify-content-end mt-5 button ">
            <a href="/logout" class="btn btn-danger m-1 container ">logout</a>
            <a href="/chat?receiver_id=<?=$data->life?>" class="btn btn-success m-1 container">messages</a>
            <button class="btn btn-success m-1 container" id="create-user">create user</button>
            <button class="btn btn-success m-1 container" id="create-subject">create subject</button>
            <button class="btn btn-success m-1 container" id="assign-subject">Assign subject to student</button>
            <button class="btn btn-success m-1 container" id="set-mark-button">set mark</button>

        </div>
        <form class="d-flex justify-content-end" id="search_form">
            <div class="form-group">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="search for user" id="search_input">
            </div>
        </form>
        <h2 class="text-center m-auto m-5 mt-3">Users</h2>
        <form id="create-user-form" class="w-50 m-auto ">
            <h3 class="text-center m-auto m-5">Create User</h3>
            <div class="form-group">
                <label for="exampleInputEmail1">username</label>
                <input type="text" class="form-control" name="username" id="create_username"
                    aria-describedby="emailHelp" placeholder="Enter username">

            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">email</label>
                <input type="email" class="form-control" name="email" id="create_email" aria-describedby="emailHelp"
                    placeholder="Enter username">

            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="create_password" placeholder="Password" name="password">
            </div>
            <ul id="password-requirements1"></ul>

            <div class="form-group">
                <label for="exampleInputPassword1">Repeat Password</label>
                <input type="password" class="form-control" id="create_repeat" name="repeat"
                    placeholder="repeat password" />

            </div>
            <div id="password-match1"></div>

            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-success mt-2 ">Submit</button>
                <button type="button" class="btn btn-danger mt-2 " id="can">cancel</button>
            </div>
        </form>



        <form id="create-subject-form" class="w-50 m-auto ">
            <h3 class="text-center m-auto m-5">Create subject</h3>
            <div class="form-group">
                <label for="exampleInputEmail1">subject name</label>
                <input type="text" class="form-control" name="name" id="subject_name" aria-describedby="emailHelp"
                    placeholder="Enter subject name">

            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">pass mark</label>
                <input type="number" class="form-control" name="email" id="pass_mark" aria-describedby="emailHelp"
                    placeholder="Enter username">

            </div>


            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-success mt-2 ">Submit</button>
                <button type="button" class="btn btn-danger mt-2 " id="canc">cancel</button>
            </div>
        </form>


        <form id="select_sutdent_sub" class="w-50 m-auto ">
            <h3 class="text-center m-auto m-5">Assign subject to student</h3>
            <div class="form-group">
                <label for="student">Select a student:</label>
                <select name="student" id="student_select" class="form-control"></select>
            </div>
            <div class="form-group">
                <label for="student">Select a Subject:</label>
                <select name="student" id="subject_select" class="form-control"></select>
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-success mt-2 ">Submit</button>
                <button type="button" class="btn btn-danger mt-2 " id="assign_cancel">cancel</button>
            </div>
        </form>


        <form id="set_mark" class="w-50 m-auto ">
            <h3 class="text-center m-auto m-5">set mark for student</h3>
            <div class="form-group">
                <label for="student">Select a student:</label>
                <select name="student" id="student_select_mark" class="form-control"></select>

            </div>
            <div class="form-group">
                <label for="student">Select a Subject:</label>

                <select name="student" id="subject_select_mark" class="form-control"></select>

            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"> mark</label>
                <input type="number" class="form-control" name="email" id="assign_mark" aria-describedby="emailHelp"
                    placeholder="Enter mark">

            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-success mt-2 ">Submit</button>
                <button type="button" class="btn btn-danger mt-2 " id="mark_cancel">cancel</button>
            </div>
        </form>


        <table class="table w-75 m-auto" id="user_table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" class="text-center tranaction-id">Username</th>
                    <th scope="col" class="text-center item-id"> E-mail</th>
                    <th scope="col" class="text-center item-id"> status</th>
                    <th scope="col" class="text-center unit-price"> Edit</th>
                    <th scope="col" class="text-center unit-price"> Delete</th>
                </tr>
            </thead>
            <tbody>
                <div id="no-results-row" class="alert alert-danger text-center" role="alert" style="display: none;">
                    No matching results found.
                </div>


            </tbody>
        </table>

    </div>
</div>