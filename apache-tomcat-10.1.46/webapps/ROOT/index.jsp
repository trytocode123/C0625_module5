<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Discount Calculator</title>
    <style>
        body {
            background: linear-gradient(135deg, #74ABE2, #5563DE);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            width: 400px;
            text-align: center;
        }

        h1 {
            margin-bottom: 25px;
            font-size: 22px;
            color: #333;
        }

        .form-group {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        label {
            flex: 1;
            text-align: left;
            font-weight: 600;
            color: #444;
        }

        input {
            flex: 2;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
            transition: 0.3s;
        }

        input:focus {
            border-color: #5563DE;
            outline: none;
            box-shadow: 0 0 6px rgba(85, 99, 222, 0.4);
        }

        button {
            width: 100%;
            padding: 12px;
            background: #5563DE;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 10px;
        }

        button:hover {
            background: #3b47a1;
        }

        h2 {
            margin-top: 25px;
            color: #222;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Discount Calculator</h1>
    <form action="/discount" method="post">
        <div class="form-group">
            <label>List Price:</label>
            <input name="listPrice" value="${listPrice}"/>
        </div>

        <div class="form-group">
            <label>Discount %:</label>
            <input name="discountPercent" value="${discountPercent}"/>
        </div>

        <button>Calculate</button>
    </form>

    <h2>Discount Amount: ${discountAmount} VND</h2>
</div>

</body>
</html>