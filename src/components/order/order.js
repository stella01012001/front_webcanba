var orderServices = new orderService(localStorage.getItem("token"));

let danhSachOrder = [];
function getListOrder() {
	orderServices
		.getOrdersList()
		.then(function (result) {
			danhSachOrder = [...result.data.data];
			renderOrderTable(result.data.data);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getDetailOrders(id) {
	orderServices
		.getDetailOrder(id)
		.then(function (result) {
			renderDetailOrder(result.data.data);
		})
		.catch(function (error) {
			console.log(error);
		});
}
function renderDetailOrder(mangDetail) {
	var contentHTML = "";
	mangDetail.map(function (item) {
		contentHTML += `
    <div class="row-detail">
    <div class="contain-img">
      <img src="../../../resource/imgs/products/${item.Image}" alt="" />
    </div>
    <p>${item.ProductName}</p>
    <span>x${item.Amount}</span>
  </div>
            `;
	});
	getEle("detailOrder").innerHTML = contentHTML;
}
function getCustomerOrders(id) {
	orderServices
		.getCustomerOrder(id)
		.then(function (result) {
			renderCustomerOrder(result.data.data);
		})
		.catch(function (error) {
			console.log(error);
		});
}
function renderCustomerOrder(mangDetail) {
	var contentHTML = "";
	mangDetail.map(function (item) {
		console.log(item);
		contentHTML += `
    <div class="container-customer">
      <div class="info-customer">
        <p>
        <label for="">Tên:</label> <span>${item.CustomerName}</span>
        </p>
        <p>
        <label for="">Email:</label>  <span>${item.email}</span>
        </p>
        <p>
        <label for="">Số điện thoại:</label> <span>${item.Phone}</span>
        </p>
        <p>
        <label for="">Địa chỉ:</label>
          <span>${item.Address}</span>
        </p>
      </div>
    </div>
            `;
	});
	getEle("detailCustomer").innerHTML = contentHTML;
}

function renderOrderTable(arr = danhSachOrder) {
	var contentHTML = "";
	arr.map(function (item) {
		const date = new Date(item.OrderDate);
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const formatDate = `${day}-${month}-${year} ${hour}:${minute}`;

		if (item.name.indexOf("Đã Hủy") != -1) {
			contentHTML += `
    <tr class="element-order danger">
    <td class="id-order">${item.id}</td>
    <td class="name-order">${item.total}</td>
    <td class="payment-order">${item.Payment ? "online" : "offline"}</td>
    <td class="date-order">${formatDate}</td>
    <td class="unit-order">
      <p>${item.name}</p>
    </td>
    <td class="address-order">
      <a class="test" href="#" data-toggle="tooltip" data-placement="right"
        title="${item.Address}">${item.Address}</a>
    </td>
    <td class="note-order">
      <a class="test" href="#" data-toggle="tooltip" data-placement="right"
        title="${item.Note}">${item.Note}</a>
    </td>
    <td class="img-detail">
      <!-- Button trigger modal -->
      <button type="button" class="detail-o" data-toggle="modal" data-target="#detail-order" onclick="getDetailOrders('${
				item.id
			}')">
        <img src="../../../resource/imgs/Log/299-2992961_order-list-icon-png-download-order-taking-icon.png" alt="" />
      </button>

     
    </td>
    <td class="img-customer">
                      <button type="button" class="detail-o" data-toggle="modal" data-target="#detail-customer"
                      onclick="getCustomerOrders('${item.idCustomer}')">
                        <img src="../../../resource/imgs/Log/icon_user.png" alt="" />
                      </button>
    </td>
    <td class="action-row">
    <button type="button" class="btn btn-danger">
    <i class="fas fa-ban"></i>
  </button>
    </td>
  </tr>
              `;
		} else if (item.name.indexOf("Hoàn Thành") != -1) {
			contentHTML += `
      <tr class="element-order success">
      <td class="id-order">${item.id}</td>
      <td class="name-order">${item.total}</td>
      <td class="payment-order">${item.Payment ? "online" : "offline"}</td>
      <td class="date-order">${formatDate}</td>
      <td class="unit-order">
        <p>${item.name}</p>
      </td>
      <td class="address-order">
        <a class="test" href="#" data-toggle="tooltip" data-placement="right"
          title="${item.Address}">${item.Address}</a>
      </td>
      <td class="note-order">
        <a class="test" href="#" data-toggle="tooltip" data-placement="right"
          title="${item.Note}">${item.Note}</a>
      </td>
      <td class="img-detail">
        <!-- Button trigger modal -->
        <button type="button" class="detail-o" data-toggle="modal" data-target="#detail-order" onclick="getDetailOrders('${
					item.id
				}')">
          <img src="../../../resource/imgs/Log/299-2992961_order-list-icon-png-download-order-taking-icon.png" alt="" />
        </button>
  
       
      </td>
      <td class="img-customer">
                        <button type="button" class="detail-o" data-toggle="modal" data-target="#detail-customer"
                        onclick="getCustomerOrders('${item.idCustomer}')">
                          <img src="../../../resource/imgs/Log/icon_user.png" alt="" />
                        </button>
      </td>
      <td class="action-row">
      <button type="button" class="btn btn-success">
      <i class="fas fa-check-circle"></i>
    </button>
      </td>
    </tr>
                `;
		} else {
			contentHTML += `
    <tr class="element-order">
    <td class="id-order">${item.id}</td>
    <td class="name-order">${item.total}</td>
    <td class="payment-order">${item.Payment ? "online" : "offline"}</td>
    <td class="date-order">${formatDate}</td>
    <td class="unit-order">
      <p>${item.name}</p>
    </td>
    <td class="address-order">
      <a class="test" href="#" data-toggle="tooltip" data-placement="right"
        title="${item.Address}">${item.Address}</a>
    </td>
    <td class="note-order">
      <a class="test" href="#" data-toggle="tooltip" data-placement="right"
        title="${item.Note}">${item.Note}</a>
    </td>
    <td class="img-detail">
      <!-- Button trigger modal -->
      <button type="button" class="detail-o" data-toggle="modal" data-target="#detail-order" onclick="getDetailOrders('${
				item.id
			}')">
        <img src="../../../resource/imgs/Log/299-2992961_order-list-icon-png-download-order-taking-icon.png" alt="" />
      </button>

     
    </td>
    <td class="img-customer">
                      <button type="button" class="detail-o" data-toggle="modal" data-target="#detail-customer"
                      onclick="getCustomerOrders('${item.idCustomer}')">
                        <img src="../../../resource/imgs/Log/icon_user.png" alt="" />
                      </button>
    </td>
    <td class="action-row">
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#edit-order" onclick = "addKeyOrder(${
				item.id
			})" >
        <i class="fas fa-wrench"></i>
      </button>
    </td>
  </tr>
              `;
		}
	});
	getEle("TBlist-order").innerHTML = contentHTML;
}

function addKeyOrder(params) {
	localStorage.setItem("idOrder", params);
}

//Cap Nhat Hóa đơn
function capNhatOrder(id) {
	//	let order = new FormData();
	let status = getEle("SL-status-ord").value;
	//	order.append("Status", Status);
	let data = JSON.stringify({
		Status: status,
	});

	console.log(data);
	orderServices
		.updateOrder(id, data)
		.then(function (result) {
			console.log(result);
			if (result.status === 200 || result.status === 201) {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Sửa sản phẩm thành công!!!",
					showConfirmButton: false,
					timer: 1500,
				});
        getListOrder();
			}
		})
		.catch((error) => {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Sửa sản phẩm không thành công!!!",
				footer: "<a href>Sai òi!!!</a>",
			});
		});
}
