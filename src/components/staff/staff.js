var staffServices = new staffService(localStorage.getItem("token"));

getListStaff();

function getListStaff() {
    staffServices
        .getStaffsList()
        .then(function(result) {
            renderStaffTable(result.data.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getEle(id) {
    return document.getElementById(id);
}

// function createNewStaff() {
// 	let fdStaff = new FormData();
// 	fdStaff.append("p_email", getEle("email-employee").value);
// 	fdStaff.append("p_password", getEle("curren-password").value);
// 	fdStaff.append("p_name", getEle("name-employee").value);
// 	fdStaff.append("p_phone", getEle("phone-employee").value);
// 	fdStaff.append("p_image", getEle("fileupload-employee").files[0]);
// 	fdStaff.append("p_address", getEle("address-employee").value);

// 	console.log("p_password", getEle("curren-password").value);
// 	console.log("p_email", getEle("email-employee").value);
// 	console.log("p_name", getEle("name-employee").value);
// 	console.log("p_phone", getEle("phone-employee").value);
// 	console.log("p_image", getEle("fileupload-employee").files[0]);
// 	console.log("p_address", getEle("address-employee").value);
// 	const config = {
// 		method: "POST",
// 		url: "http://localhost:5000/api/v1/staff/",
// 		data: fdStaff,
// 		headers: {
// 			Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			"Content-Type": "multipart/form-data",

// 		},
// 	}
// 	axios(config)
// 	.then(function (response) {
// 		console.log(response);
// 	  console.log(JSON.stringify(response.data));
// 	})
// 	.catch(function (error) {
// 	  console.log(error);
// 	});

// }

function createNewStaff() {
    let fdStaff = new FormData();
    fdStaff.append("p_email", getEle("email-employee").value);
    fdStaff.append("p_password", getEle("curren-password").value);
    fdStaff.append("p_name", getEle("name-employee").value);
    fdStaff.append("p_phone", getEle("phone-employee").value);
    fdStaff.append("p_image", getEle("fileupload-employee").files[0]);
    fdStaff.append("p_address", getEle("address-employee").value);

    staffServices
        .addNewStaff(fdStaff)
        .then((result) => {
            console.log(result);
            if (typeof result !== "undefined") {
                Swal.fire({
                    icon: "success",
                    title: "Thêm sản aaa phẩm thành công!!!",
                    showConfirmButton: false,
                    timer: 5500,
                });
            }
        })
        .catch((error) => {
            console.log("error Product", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Thêm sản phẩm không thành công!!!",
                footer: "<a href>Sai òi!!!</a>",
            });
        });
}

//Sua san pham
function suaE(idE) {
    staffServices
        .getCustomerById(idE)
        .then(function(result) {
            console.log(result.data.data);
            localStorage.setItem("idE", idE);
            const path = "../../../resource/imgs/user/";
            var pathnew = path + result.data.data[0].image;

            getEle("email-employeeE").value = result.data.data[0].email;
            getEle("name-employeeE").value = result.data.data[0].EmployeeName;
            getEle("phone-employeeE").value = result.data.data[0].Phone;
            getEle("address-employeeE").value = result.data.data[0].Address;
            getEle("upload-img-employeeE").value = pathnew;
        })
        .catch(function(err) {
            console.log(err);
        });
}

function deleteStaffById(id, email) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger cus-alert",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "Bạn có muốn xóa??",
            text: "Nhân viên sẽ về trạng thái đóng",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa!",
            cancelButtonText: "Hủy!",
            reverseButtons: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                staffServices
                    .deleteStaffById(id, email)
                    .then((result) => {
                        if (result.status === 200 || result.status === 201) {
                            Swal.fire({
                                icon: "success",
                                title: "Xóa thành công~~",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            getListStaff();
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `Xóa không thành công!`,
                            footer: "Bạn không phải chủ cửa hàng",
                        });
                    });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire("Đã Hủy");
            }
        });
}

function resetStaffById(id) {
    Swal.fire({
        title: "Bạn có muốn khôi phục tài khoản?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Hủy",
        confirmButtonText: "Khôi phục",
    }).then((result) => {
        if (result.isConfirmed) {
            staffServices
                .resetAccount(id)
                .then((result) => {
                    if (result.status === 200 || result.status === 201) {
                        Swal.fire(
                            "Khôi Phục Thành Công!",
                            "Tài khoản bạn đã ở trạng thái mở.",
                            "success"
                        );
                        getListStaff();
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `Khôi phục tài khoản không thành công!!! ${error}`,
                        footer: "<a href>Sai òi!!!</a>",
                    });
                });
        }
    });
}

function renderStaffTable(customerArr) {
    var contentHTML = "";
    customerArr.map(function(item) {
        if (item.flag == 1) {
            contentHTML += `
		<div class="media">
			<div class="media-left media-middle">
				<img
					src="../../../resource/imgs/p_image/${item.image}"
					class="media-object"
					style="width: 80px"
				/>
			</div>
			<div class="media-body">
				<h4 class="media-heading">${item.EmployeeName}</h4>
				<p>
					<label for="">ID:</label> <span>${item.id}</span>
				</p>
				<p>
					<label for="">SDT:</label> <span>${item.Phone}</span>
				</p>
				<p>
					<label for="">Email:</label> <span>${item.email}</span>
				</p>
				<p>
					<label for="">Địa chỉ:</label> <span class="address-employee" >${item.Address}</span>
				</p>
				<button
					type="button"
					data-toggle="modal"
					data-target="#edit-emloyees"
					type="button"
					class="btn btn-success"
					onclick="suaE('${item.id}')"
				>
					Sửa
				</button>
				<button
					type="button"
					class="btn btn-danger"
					onclick="deleteStaffById('${item.id}', '${item.email}')"
				>
					Xóa
				</button>
			</div>
		</div>
        `;
        } else {
            contentHTML += `
		<div class="media">
			<div class="media-left media-middle">
				<img
					src="../../../resource/imgs/p_image/${item.image}"
					class="media-object"
					style="width: 80px"
				/>
			</div>
			<div class="media-body">
				<h4 class="media-heading">${item.EmployeeName}</h4>
				<p>
					<label for="">ID:</label> <span>${item.id}</span>
				</p>
				<p>
					<label for="">SDT:</label> <span>${item.Phone}</span>
				</p>
				<p>
					<label for="">Email:</label> <span>${item.email}</span>
				</p>
				<p>
					<label for="">Địa chỉ:</label> <span class="address-employee" >${item.Address}</span>
				</p>
				<button
					type="button"
					type="button"
					class="btn btn-success"
					onclick="resetStaffById('${item.email}')"
				>
					Khôi phục
				</button>
			</div>
		</div>
        `;
        }
    });
    getEle("TB-list-employees").innerHTML = contentHTML;
}

document.getElementById("logout_btn").addEventListener("click", function() {
    staffServices
        .logout()
        .then((res) => {
            if (res.data.success) {
                Swal.fire({
                    icon: "info",
                    title: "Đã Đăng Xuất",
                });
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setTimeout(() => {
                    window.location.href = "/admin_view/views/admin/login.html";
                }, 2000);
            }
        })
        .catch((e) => alert(e.message));
});

document.getElementById("changePass_btn").addEventListener("click", function() {
    let pass = document.getElementById("current-password").value;
    let newpass = document.getElementById("new-password").value;
    let repass = document.getElementById("re-password").value;

    let flag = true;

    if (pass.length == 0 || pass.length < 8 || pass.length > 16) {
        document.getElementById("current-password").classList.add("error-input");
        flag = false;
    }
    if (newpass.length == 0 || newpass.length < 8 || newpass.length > 16) {
        document.getElementById("new-password").classList.add("error-input");
        flag = false;
    }
    if (!repass.match(newpass)) {
        document.getElementById("re-password").classList.add("error-input");
        flag = false;
    }
    if (flag == true) {
        staffServices
            .changePassAccount(pass, newpass)
            .then((res) => {
                if (res.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Đổi Mật Khẩu Thành Công",
                        text: `Vui Lòng Đăng Nhập Lại Tài Khoản`,
                    });
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setTimeout(() => {
                        window.location.href = "/admin_view/views/admin/login.html";
                    }, 2000);
                }
            })
            .catch((e) => {
                Swal.fire({
                    icon: "error",
                    title: "Đổi Mật Khẩu Không Thành Công",
                    text: `Vui Lòng Kiểm Tra Thông Tin Chính Xác`,
                });
            });
    }

    if (flag == false) {
        Swal.fire({
            icon: "error",
            title: "Nhập Thông Tin Đầy Đủ",
        });
    }
});

document
    .getElementById("btn-employeeEdit")
    .addEventListener("click", function() {
        let edit_emp = new FormData();

        let name = getEle("name-employeeE").value;
        let phone = getEle("phone-employeeE").value;
        let address = getEle("address-employeeE").value;
        let image = getEle("image-employeeE").files[0];

        edit_emp.append("EmployeeName", name);
        edit_emp.append("Phone", phone);
        edit_emp.append("Address", address);
        edit_emp.append("p_image", image);

        let id = localStorage.getItem("idE");
        staffServices
            .updateStaffById(id, edit_emp)
            .then(function(result) {
                if (result.status === 200 || result.status === 201) {
                    console.log(result);
                    Swal.fire({
                        icon: "success",
                        title: "Sửa nhân viên thành công!!!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getListStaff();
                    // let a = document.getElementsByClassName("form-control");
                    // Array.from(a).forEach((item) => (item.value = ""));
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sửa nhân viên không thành công!!!",
                    footer: "<a href>Sai òi!!!</a>",
                });
            });
        localStorage.removeItem("idE");
    });