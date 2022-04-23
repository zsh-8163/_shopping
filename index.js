$(function(){
    //全选选项
    $(".checkAll").change(function(){    
        $(".j-checkbox,.checkAll").prop("checked",$(this).prop("checked"));       
        // 变换背景颜色
        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    })
    //单选选项
    $(".j-checkbox").change(function(){
        //当已选物品等于所有商品数量时，全选选项显示已选
        if($(".j-checkbox:checked").length==$(".j-checkbox").length ){
            $(".checkAll").prop("checked",true);
        }else{
            $(".checkAll").prop("checked",false);
        }
        // 变换背景颜色
        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    })

    //增减商品数量
    $(".increment").click(function(){
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        //小计模块，小计=当前文本框的值*数量
        var p = $(this).parents().siblings(".p-price").html() ;
        p = p.substr(1);
        $(this).parents().siblings(".p-sum").html( "￥" + (n*p).toFixed(2));
        getSum();
    })
    $(".decrement").click(function(){
        var n = $(this).siblings(".itxt").val();
        if(n > 1) n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents().siblings(".p-price").html() ;
        p = p.substr(1);
        $(this).parents().siblings(".p-sum").html("￥" + (n*p).toFixed(2));
        getSum();
    })

    //文本框发生改变时，直接计算小计
    $(".itxt").change(function(){
        var n = $(this).val();
        var p = $(this).parents().siblings(".p-price").html();
        p = p.substr(1);
        console.log(p);
        $(this).parents().siblings(".p-sum").html("￥" + (n*p).toFixed(2));
        getSum();
    })
    getSum();
    //商品个数和总价格
    function getSum(){
        var count = 0;
        var money = 0;
        $(".itxt").each(function(i,ele){
            //被选中时才进行相加
            if($(this).parents(".p-num").siblings(".p-checkbox").children(".j-checkbox") .prop("checked")){
                count += parseInt($(ele).val()) ;
            }          
        })
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i,ele){
            if($(this).siblings(".p-checkbox").children(".j-checkbox") .prop("checked")){
                money += parseFloat($(ele).text().substr(1));
            }            
        })
        $(".price-sum em").text( money.toFixed(2));
    }

    //删除商品模块
    //（1）商品后面的删除按钮
    $(".p-action").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
        clearCheckAll();
    })
    //（2）删除选中的商品
    $(".remove-batch").click(function(){
        //此处使用隐式迭代实现 
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
        clearCheckAll();
    })
    //（3）清空购物车，删除所有商品
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
        clearCheckAll();
    })

    function clearCheckAll(){
        if( $(".j-checkbox").length == 0){
            $(".checkAll").prop("checked",false);
        }
    }
})