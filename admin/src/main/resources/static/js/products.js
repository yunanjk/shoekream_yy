// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// 파일첨부
// 이미지 업로드
$("input[type='file']").on("change", function(e){
    let isExist = document.getElementById("previewImg").getAttribute("create");
    if(isExist == "true"){
        let formData = new FormData();
        // 화면 이동없이 첨부파일을 서버로 전송해야함
        // 폼태그와 같은 역할을 해주는 formData 객체를 생성해 첨부파일을 formData에 저장하고 formData 자체를 서버로 전송해야함

        let fileInput = $('input[name="uploadFile"]');
        let fileList = fileInput[0].files;

        let fileObj = fileList[0]; // file 객체를 담기 위한 변수를 선언하여 file 객체로 초기화해줌

        if(!fileCheck(fileObj.name, fileObj.size)){
            return false;
        }
        // alert("사진 파일 이름, 크기 통과");

        formData.append("uploadFile", fileObj);
        // 첨부한 파일을 폼데이터에 업로드파일이라는 이름으로 추가해줌 (input name과 같아야함)
        // <input name="uploadFile" value="fileObj"> 와 같은 뜻

        // ajax를 사용하여 서버로 전송
        $.ajax({
            url: '/api/admin/products/uploadFile', // 서버로 요청을 보낼 url
            processData : false, // 서버로 전송할 데이터를 queryStirng 형태로 변환할지 여부
            contentType : false, // 서버로 전송되는 데이터의 content-type
            data : formData, // 서버로 전송할 데이터
            type : 'POST', // 서버 요청 타입(GET, POST)
            dataType : 'text', // 서버로부터 반환받을 데이터 타입
            success : function (data){
                //alert(data);
                document.getElementById("previewImg").value = "/images/" + data;
                //alert("create success");
            },
            error: function(e) {
                alert("값을 가져오지 못했습니다.");
            }
        });
    }
    else if(isExist == null) {
        let formData2 = new FormData();

        let fileInput2 = $('input[name="uploadFile2"]');
        let fileList2 = fileInput2[0].files;

        let fileObj2 = fileList2[0]; // file 객체를 담기 위한 변수를 선언하여 file 객체로 초기화해줌

        if(!fileCheck(fileObj2.name, fileObj2.size)){
            return false;
        }
        // alert("사진 파일 이름, 크기 통과"); // 파일 타입, 크기 조건 둘 다 만족하면 뜸

        formData2.append("uploadFile", fileObj2);
        // 첨부한 파일을 폼데이터에 업로드파일이라는 이름으로 추가해줌 (input name과 같아야함)
        // <input name="uploadFile" value="fileObj"> 와 같은 뜻


        // ajax를 사용하여 서버로 전송
        $.ajax({
            url: '/api/admin/products/uploadFile', // 서버로 요청을 보낼 url
            processData : false, // 서버로 전송할 데이터를 queryStirng 형태로 변환할지 여부
            contentType : false, // 서버로 전송되는 데이터의 content-type
            data : formData2, // 서버로 전송할 데이터
            type : 'POST', // 서버 요청 타입(GET, POST)
            dataType : 'text', // 서버로부터 반환받을 데이터 타입
            success : function (data){
                //alert(data);
                document.getElementById("previewImgEdit").value = "/images/" + data;
                //alert("edit success");
            },
            error: function(e) {
                alert("값을 가져오지 못했습니다.");
            }
        });
    }
});


function load_img_create(input){
    if(input.files && input.files[0]){
        const file = new FileReader();
        file.onload = function (e) {
            document.getElementById("previewImg").src = e.target.result;
        }
        file.readAsDataURL(input.files[0]);
    }
    else{
        document.getElementById("previewImg").src = "";
    }
}

function load_img_edit(input){
    if(input.files && input.files[0]){
        const file = new FileReader();
        file.onload = function (e) {
            document.getElementById("previewImgEdit").src = e.target.result;
        }
        file.readAsDataURL((input.files[0]));
    }
    else{
        document.getElementById("previewImgEdit").src = "";
    }
}

// 파일 타입, 크기 제한
let regex = new RegExp("(.*?)\.(jpg|jpeg|png)$"); // 이미지 파일 타입 png, jpg, jpeg만 허용
let maxSize = 1048576; // 1MB 제한
let blankPattern = /[\s]/g;
function fileCheck(fileName, fileSize){
    if(fileSize >= maxSize){
        alert("파일 업로드 가능한 사이즈를 초과하였습니다.");
        return false;
    }
    if(!regex.test(fileName)){
        alert("해당 종류의 파일은 업로드할 수 없습니다.");
        return false;
    }
    if(blankPattern.test(fileName)){
        alert("파일명에는 공백이 포함될 수 없습니다.");
        return false;
    }
    return true;
}



// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// create
function productcreate_popup(){
    document.querySelector(".product_create").style.display = "block";
    document.getElementById("previewImg").setAttribute("create", "true");
    document.getElementById('productCreateBtn').onclick = function(){sendit()};
}

function sendit(){
    const brand = document.getElementById("brand").value; // 브랜드
    const name = document.getElementById("name").value; // 상품명
    const nameKor = document.getElementById("nameKor").value; // 상품명(kor)
    const size = document.getElementById("size").value; // 사이즈
    // const img2 = document.getElementById("previewImg").value; // 상품사진
    //     const img = img2.replaceAll("http://localhost:8899", "");
    const img = document.getElementById("previewImg").value;
    const modelNum = document.getElementById("modelNum").value; // 모델번호
    const releaseDate = document.getElementById("releaseDate").value; // 출시일
    const color = document.getElementById("color").value; // 컬러
    const firstPrice = document.getElementById("firstPrice").value; // 발매가
    const category = document.getElementById("category").value; // 카테고리
    const gender = document.getElementById("gender").value; // 성별
    const collection = document.getElementById("collection").value; // 컬렉션

    if(brand == ""){
        alert("브랜드명을 작성해주세요");
        brand.focus();
        return false;
    }
    if(name == ""){
        alert("상품명을 작성해주세요");
        name.focus();
        return false;
    }
    if(nameKor == ""){
        alert("상품명(kor) 작성해주세요");
        nameKor.focus();
        return false;
    }
    if(size == ""){
        alert("사이즈를 작성해주세요");
        size.focus();
        return false;
    }
    if(img == undefined){
        alert("상품 이미지를 넣어주세요");
        img.focus();
        return false;
    }

    fetch("http://localhost:8899/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "transaction_time":`${new Date()}`,
            "resultCode":"ok",
            "description":"정상",
            "data":{
                "brand":`${brand}`,
                "name":`${name}`,
                "nameKor":`${nameKor}`,
                "size":`${size}`,
                "img":`${img}`,
                "modelNum":`${modelNum}`,
                "releaseDate":`${releaseDate}`,
                "color":`${color}`,
                "firstPrice":`${firstPrice}`,
                "category":`${category}`,
                "gender":`${gender}`,
                "collection":`${collection}`
            }
        }),
    })
        .then((res) => {
            //alert("상품 등록 성공!")
            location.reload();
            return;
        })
        .then((data) => {
            console.log(data);
            return;
        })
        .catch((err) => {
            alert("에러! 에러! 상품 등록 실패!");
            location.reload();
            return;
        })
}

function productcreate_popdown(){
    document.querySelector(".product_create").style.display = "none";
    document.getElementById("previewImg").removeAttribute("create");
    location.reload();
}




// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// view
function productview_popup(idx){
    fetch("http://localhost:8899/api/admin/products/" + idx)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            document.querySelector(".idx").innerHTML=data.data.idx;
            document.querySelector(".name").innerHTML=data.data.name;
            document.querySelector(".nameKor").innerHTML=data.data.nameKor;
            document.getElementById("previewImg2").src=data.data.img;
            document.querySelector(".brand").innerHTML=data.data.brand;
            document.querySelector(".size").innerHTML=data.data.size;
            document.querySelector(".category").innerHTML=data.data.category;
            document.querySelector(".modelNum").innerHTML=data.data.modelNum;
            document.querySelector(".releaseDate").innerHTML=data.data.releaseDate;
            document.querySelector(".color").innerHTML=data.data.color;
            document.querySelector(".firstPrice").innerHTML=data.data.firstPrice;
            document.querySelector(".category").innerHTML=data.data.category;
            document.querySelector(".gender").innerHTML=data.data.gender;
            document.querySelector(".collection").innerHTML=data.data.collection;
        })

    document.querySelector(".product_view").style.display = "block";
}

function productview_popdown() {
    document.querySelector(".product_view").style.display = "none";
}




// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// edit
function productedit_popup(idx){
    fetch('http://localhost:8899/api/admin/products/'+idx)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            document.querySelector("#edit_idx").innerHTML=data.data.idx;
            document.querySelector("#edit_brand").value=data.data.brand;
            document.querySelector("#edit_name").value=data.data.name;
            document.querySelector("#edit_nameKor").value=data.data.nameKor;
            document.getElementById("previewImgEdit").src=data.data.img;
            document.querySelector("#edit_size").value=data.data.size;
            document.querySelector("#edit_modelNum").value=data.data.modelNum;
            document.querySelector("#edit_releaseDate").value=data.data.releaseDate;
            document.querySelector("#edit_color").value=data.data.color;
            document.querySelector("#edit_firstPrice").value=data.data.firstPrice;
            document.querySelector("#edit_category").value=data.data.category;
            document.querySelector("#edit_gender").value=data.data.gender;
            document.querySelector("#edit_collection").value=data.data.collection;
        })
    document.querySelector(".product_edit").style.display = "block";

    document.getElementById("productEditBtn").onclick = function(){sendedit(idx)};
}

    function sendedit(idx) {
        const idx2 = document.getElementById('edit_idx').innerHTML; // 수정 안된 idx
        const brand2 = document.getElementById('edit_brand').value;
        const name2 = document.getElementById('edit_name').value;
        const nameKor2 = document.getElementById('edit_nameKor').value;
        const size2 = document.getElementById('edit_size').value;
        let img2="";
        if(document.getElementById('previewImgEdit').value == null){
            const img = document.getElementById('previewImgEdit').src;
            img2 = img.replaceAll("http://localhost:8899", "");
        }else {
            const img = document.getElementById('previewImgEdit').value;
            img2 = img.replaceAll("http://localhost:8899", "");
        }
        const modelNum2 = document.getElementById('edit_modelNum').value;
        const releaseDate2 = document.getElementById('edit_releaseDate').value;
        const color2 = document.getElementById('edit_color').value;
        const firstPrice2 = document.getElementById('edit_firstPrice').value;
        let c = document.getElementById('edit_category');
        const category2 = c.options[c.selectedIndex].value;
        let g = document.getElementById('edit_gender');
        const gender2 = g.options[g.selectedIndex].value;
        let co = document.getElementById('edit_collection');
        const collection2 = co.options[co.selectedIndex].value;

        fetch('http://localhost:8899/api/admin/products/' + idx, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "transaction_time": `${new Date()}`,
                "resultCode": "ok",
                "description": "정상",
                "data": {
                    "idx": `${idx2}`,
                    "brand": `${brand2}`,
                    "name": `${name2}`,
                    "nameKor": `${nameKor2}`,
                    "size": `${size2}`,
                    "img": `${img2}`,
                    "modelNum": `${modelNum2}`,
                    "releaseDate": `${releaseDate2}`,
                    "color": `${color2}`,
                    "firstPrice": `${firstPrice2}`,
                    "category": `${category2}`,
                    "gender": `${gender2}`,
                    "collection": `${collection2}`
                }
            }),
        })
            .then((res) => {
                //alert("상품 수정 성공!")
                location.reload();
                return;
            })
            .then((data) => {
                console.log(data);
                return;
            })
            .catch((err) => {
                alert("에러! 에러! 상품 수정 실패!");
                location.reload();
                return;
            })
    }

function productedit_popdown() {
    document.querySelector(".product_edit").style.display = "none";
    location.reload();
}




// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// delete
function productdelete_popup(idx){
    document.querySelector(".product_delete").style.display = "block";
    const btn_delete = document.querySelector(".btn_delete");
    btn_delete.addEventListener("click",()=>{
        admindelete(idx);
    });
}



function admindelete(idx){
    fetch('http://localhost:8899/api/admin/products/'+idx, {
        method: "DELETE"
    })
        .then((res) => {
            //alert("상품 삭제 성공!")
            location.reload();

        })
        .then((data) => {
            console.log(data);
            return;
        })
        .catch((err) => {
            alert("에러! 에러! 상품 삭제 실패!");
            location.reload();
            return;
        })
}

function productdelete_popdown() {
    document.querySelector(".product_delete").style.display = "none";
}


// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// 키워드 검색 -> 브랜드, 모델번호
const searchInput = document.getElementById('search_box')
searchInput.addEventListener('blur', () => {
    search_products();
});

function search_products(){
    location.href="/products?page=0&searchKeyword="+searchInput.value;
}

function href_buyList(idx) {
    fetch('http://localhost:8899/api/admin/products/'+idx)
        .then((response) => response.json())
        .then((data) => {
            let name = data.data.name
            location.href="/buy?page=0&searchKeyword="+name;
        })

}
function href_sellList(idx) {
    fetch('http://localhost:8899/api/admin/products/'+idx)
        .then((response) => response.json())
        .then((data) => {
            let name = data.data.name
            location.href="/sell?page=0&searchKeyword="+name;
        })

}


