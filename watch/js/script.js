/*
 * @Author: anchen
 * @Date:   2016-10-12 09:48:56
 * @Last Modified by:   anchen
 * @Last Modified time: 2016-10-17 16:30:44
 */
$(document).ready(function($) {
    $('#etalage').etalage({
        thumb_image_width: 400,
        thumb_image_height: 400,
        source_image_width: 900,
        source_image_height: 1200,
        click_callback: function(image_anchor, instance_id) {
            alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
        }
    });

    $('input').change(function(event) {
        /* Act on the event */
        var selclass = $(this).attr("name");
        var $selclass = $("." + selclass);
        var price = $(this).attr("price");
        var selected = $(this).val();
        selected = selected == "" ? "0" : selected;
        var type = $(this).attr("type");
        if (type != "text" && type != "number") {
            $selclass.children().eq(1).text(selected);
            $selclass.children().eq(2).text("US$" + price).val(price);
        } else {
            $selclass.children().text(selected);
        }
        account();
    });
    var init = ["watchcase", "glass", "caseback", "crowntube", "plating", "but", "watchcrown", "caseaccessory", "watchhand", "watchband", "bsb", "clasp", "buckleSpringBar", "ledmovement"];
    for (i = 0; i < init.length; i++) {
        initAmount(init[i]);
    }
    account();

//submit
    $('.submit-form').click(function() {
        $.ajax({
            type: 'post',
            url: '/',
            data: $('.form-horizontal').serialize(),
            success: function() {
                alert("ok");
                location.reload();
            },
            error: function() {
                alert("no");
            }
        });
    });
});
//统计价钱
function account() {
    var count = 0;
    var $li = $('.group ul>li:nth-child(3)');
    $li.each(function() {
        count = count + $(this).val();
    });
    var qua = Number($('.quantity a').text());
    var com = count * qua * 0.2;
    var total = (com + count * qua).toFixed(5);
    $('.totalprice label a').text(count);
    $('.com a').text(count);
    $('.cou a').text(com.toFixed(5));
    $('.total-price a').text(total);

}
//radio选项被改变时改变信息
function changeVal(inp, selected, price) {
    $(inp).change(function(event) {
        /* Act on the event */
        $(selected).text($(this).val());
        $(price).text("US$" + $(this).attr("price"));
    });
};
//初始化表单
function initAmount(selected) {
    var che = 'input[name=' + selected + ']:checked';
    var $che = $(che);
    var sel = '.' + selected + ' li:nth-child(2)';
    var price = '.' + selected + ' li:nth-child(3)';
    var ischeck = $che.val();
    if (typeof(ischeck) != "undefined") {
        $(sel).text($che.val());
        $(price).text("US$" + $che.attr('price')).val($che.attr('price'));
    }
    if ($('.quantity').children().text() == "") {
        $('.quantity').children().text("0");
    }
}

function offsetTop(elements) {
    var top = elements.offsetTop;
    var parent = elements.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    };
    return top;
};

window.onload = function() {
    initScroll();

    var btn = document.getElementById('flxd');

    var timer = null;
    var istop = true;
    var clienttop = document.documentElement.clientHeight;

    window.onscroll = function() {
        var ostop = document.documentElement.scrollTop || document.body.scrollTop;
        var H = offsetTop(btn) + 310;
        if (ostop >= 340) {
            $(btn).addClass("flx");
        } else {
            $(btn).removeClass("flx");
        }

    }
}

function initScroll() {
    var btn = document.getElementById('flxd');
    var ostop = document.documentElement.scrollTop || document.body.scrollTop;
    var H = offsetTop(btn) + 310;
    if (ostop >= 340) {
        $(btn).addClass("flx");
    } else {
        $(btn).removeClass("flx");
    }
}
$('.form-horizontal').validate({
    rules: {
        quantity: {
            required: true,
            isPositiveInteger: true
        }
    },
    messages: {
        quantity: {
            required: "* Please enter a positive integer"
        }
    }
});
$.validator.addMethod("isPositiveInteger", function(value, element) {
    var reg = /^[1-9]\d*$/;
    return this.optional(element) || (reg.test(value));
}, "* Please enter a positive integer");
