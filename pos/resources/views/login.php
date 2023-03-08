<div class="container my-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h3 class="text-center">Login</h3>
        </div>
        <div class="card-body">
          <form id="login-form" class="mb-3">
            <div class="form-group">
             
              <input type="text" class="form-control  m-1" name="username" id="user" placeholder="Enter username" required>
            </div>
            <div class="form-group">
              
              <input type="password" class="form-control  m-1" name="password" id="pass" placeholder="Password" required>
            </div>
            <div class="form-check mb-3">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" name="remember_me">
              <label class="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
          </form>
          <div class="text-center">
            <p>Don't have an account? <a href="/registration" class="text-success">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
