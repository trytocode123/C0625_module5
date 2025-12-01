function SignInForm() {
    return (
        <div className="container d-flex justify-content-end mt-5">
            <div className="card shadow p-4 rounded-4" style={{width: "380px"}}>
                <h3 className="text-center mb-4 text-primary fw-bold">Sign In</h3>

                <div className="mb-3">
                    <label className="form-label fw-semibold text-start d-block">
                        Username
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold text-start d-block">
                        Password
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>
                </div>

                <button className="btn btn-primary w-100 py-2 mt-2 fw-semibold">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default SignInForm;
