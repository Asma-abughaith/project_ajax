
<div class="shade"></div>
<div id="edit" class="w-50 m-auto">
        <div class="gap-5">
            <button class="btn btn-danger" id="editcancel"><i class=" fa-solid fa-xmark b-none"></i></button>
            <span class="text-center">edit the course</span>
        </div>
        <form id="edit_course" class="w-100 m-auto " enctype="multipart/form-data">
            <div class="form-group">
                <label for="exampleInputEmail1">course name</label>
                <input type="text" class="form-control" name="course_name" id="editname" aria-describedby="emailHelp"
                    placeholder="Enter course name">
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">course exert</label>
                <input type="text" class="form-control" name="course_exert" id="editcourse_exert"
                    aria-describedby="emailHelp" placeholder="Enter course exert">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">enter detail of course</label>
                <textarea class="form-control" id="editcourses_details" placeholder="Enter detail of course"
                    name="courses_details" rows="4" cols="50">
            </textarea>
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">enter price</label>
                <input type="number" class="form-control" id="editprice" name="price" placeholder="price" min="0" step="any"/>
            </div>

            <button type="submit" class="btn btn-primary mt-2 ">Submit</button>
        </form>
    </div>



    <div id="create" class="w-50 m-auto">
        <div class="gap-5">
            <button class="btn btn-danger" id="cancel"><i class=" fa-solid fa-xmark b-none"></i></button>
            <span class="text-center">create new course</span>
        </div>
        <form id="creare_course" class="w-100 m-auto " enctype="multipart/form-data">
            <div class="form-group">
                <label for="exampleInputEmail1">course name</label>
                <input type="text" class="form-control" name="course_name" id="name" aria-describedby="emailHelp"
                    placeholder="Enter course name">
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">course exert</label>
                <input type="text" class="form-control" name="course_exert" id="course_exert"
                    aria-describedby="emailHelp" placeholder="Enter course exert">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">enter detail of course</label>
                <textarea class="form-control" id="courses_details" placeholder="Enter detail of course"
                    name="courses_details" rows="4" cols="50">
            </textarea>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">course image</label>
                <input type="file" class="form-control" name="image" id="image">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">enter price</label>
                <input type="number" class="form-control" id="price" name="price" placeholder="price" min="0" step="any"/>
            </div>

            <button type="submit" class="btn btn-primary mt-2 ">Submit</button>
        </form>
    </div>

    <h2 class="text-center my-3">All Courses</h2>
    <button class="btn btn-success m-5" id="course_button">create course</button>
    <div id="courses" class="container row m-auto">

    </div>
    