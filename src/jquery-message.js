(function (window, document) {
    'use strict';

    // Wrap is used for AMD support
    var fn = function ($) {

        var _opt = {
            type: 'info', // Choice: info, success, warning, error.
            auto_dismiss: false,
            ttl: 3000 // Time to live in milliseconds
        };

        var create_message = function (option, message, callback) {
            var container = $(document.createElement('div')).addClass('msg_container').addClass('msg_container_' + option.type);
            var title = $(document.createElement('div')).addClass('msg_title').html(message.title);
            var content = $(document.createElement('div')).addClass('msg_content').html(message.content);
            var dismiss_btn = $(document.createElement('a')).addClass('msg_dismiss_btn').click(function () {
                $(this).parent('.msg_container').fadeOut('normal', function () {
                    $(this).remove();
                    if (callback) {
                        callback();
                    }
                });
            });

            container.append(title).append(content).append(dismiss_btn);
            return container;
        }

        var show_window_message = function (option, message, callback) {
            var msg_hub = $('.msg_hub');
            if (msg_hub.length == 0) {
                msg_hub = $(document.createElement('div')).addClass('msg_hub');
                $(document.body).append(msg_hub);
            }
            var new_msg = create_message(option, message, callback);
            msg_hub.append(new_msg);
            if (option.auto_dismiss) {
                setTimeout(function () {
                    new_msg.remove();
                    if (callback) {
                        callback();
                    }
                }, option.ttl);
            }
        }

        $.show_message = function (message, option, callback) {
            var opt = $.extend({}, _opt, option);
            if (typeof(message) === 'string') {
                message = {
                    title: message
                }
            }
            if (message) {
                show_window_message(opt, message, callback);
            }
        }
    };

    if (typeof define == 'function' && define.amd) {
        define(['jquery'], fn);
    } else {
        fn(window.jQuery);
    }
}(window, document));
