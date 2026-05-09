import Register from "./register"
function login() {
  return (
    <>
        <h1>Login</h1>
        <div>
            <label htmlFor="email">Email</label>
            <input type="text" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="text" />
        </div>
        <div>
            Don't have an account
        </div>
        <Register></Register>
    </>
  )
}

export default login