var testItems = [
{"id":1,"name":"Almond Toe Court Shoes, Patent Black","category":"Women's Footwear","old_price":null,"price":99.0,"quantity":5},
{"id":2,"name":"Suede Shoes, Blue","category":"Women's Footwear","old_price":null,"price":42.0,"quantity":4},
{"id":3,"name":"Leather Driver Saddle Loafers, Tan","category":"Men's Footwear","old_price":null,"price":34.0,"quantity":12},
{"id":4,"name":"Flip Flops, Red","category":"Men's Footwear","old_price":null,"price":19.0,"quantity":6},
{"id":5,"name":"Flip Flops, Blue","category":"Men's Footwear","old_price":null,"price":19.0,"quantity":0},
{"id":6,"name":"Gold button Cardigan, Black","category":"Women's Casualwear","old_price":null,"price":49.99,"quantity":9},
{"id":7,"name":"Cotton Shorts, Medium Red","category":"Women's Casualwear","old_price":null,"price":30.0,"quantity":5}
]

var testVouchers = [ { "description": "£5 off your order", "discount": 5, "minimum_order": 5, "condition": "", "minimum_number": 0 },
  { "description": "$10 off when you spend over £50.00", "discount": 10, "minimum_order": 50, "condition": "", "minimum_number": 0 },
  { "description": "£15 off when you have bought at least one footwear item and spent over $75.00", "discount": 15, "minimum_order": 75, "condition": "Footwear", "minimum_number": 1 }
]