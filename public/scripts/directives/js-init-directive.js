function date(date, settings) {
    if (!date) return '';
    var day = date.getDate();
    if (day <= 9) {
        day = '0' + day;
    }
    var month = date.getMonth() + 1;
    if (month <= 9) {
        month = '0' + month;
    }
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
};

app.directive('jsDataCreateInit', function($compile) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $('.ui.calendar.js-date-create-begin').calendar({
                type: 'date',
                formatter: {
                    date: date
                },
                onChange: function(date, text) {
                    console.log($scope.username);
                    $('.ui.calendar.js-date-create-begin :input').val(text).trigger("change");
                },
                endCalendar: $('.ui.calendar.js-date-create-end')
            });

            $('.ui.calendar.js-date-create-end').calendar({
                type: 'date',
                formatter: {
                    date: date
                },
                onChange: function(date, text) {
                    $('.ui.calendar.js-date-create-end :input').val(text).trigger("change");
                },
                startCalendar: $('.ui.calendar.js-date-create-begin')
            });

            $('.js-create-date').dropdown('set value', 0);
        },
    };
});

app.directive('jsDataClickInit', function($compile) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $('.ui.calendar.js-date-click-begin').calendar({
                type: 'date',
                formatter: {
                    date: date
                },
                onChange: function(date, text) {
                    $('.ui.calendar.js-date-click-begin :input').val(text).trigger("change");
                },
                endCalendar: $('.ui.calendar.js-date-click-end')
            });
            $('.ui.calendar.js-date-click-end').calendar({
                type: 'date',
                formatter: {
                    date: date
                },
                onChange: function(date, text) {
                    $('.ui.calendar.js-date-click-end :input').val(text).trigger("change");
                },
                startCalendar: $('.ui.calendar.js-date-click-begin')
            });
            $('.js-click-date').dropdown('set value', 0);
        },
    };
});

app.directive('jsDropdownUserRangeInit', function($compile, $timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $('.ui.dropdown.js-user-range').dropdown({
                onChange: function(value, text, $choice) {
                    $timeout(function() {
                        $scope.showTags = (value == '1');
                    })
                },
            });
            $('.js-user-range').dropdown('set value', '1');
        },
    };
});

app.directive('jsDropdownTagsInit', function($compile) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            $('.ui.dropdown.js-search-tags').dropdown({
                useLabels: false
            });

            $('.ui.dropdown.js-search-tags .text').removeClass('default');
        },
    };
});

app.directive('jsEditTagsInit', function($compile) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            if ($scope.$last === true) {
                console.log('jsEditTagsInit.....................')
                $('.ui.modal.js-add-bookmark .ui.dropdown').removeClass('loading');
                $('.ui.dropdown.js-tags').dropdown({
                    forceSelection: false,
                    maxSelections: 3,
                    action: 'combo',
                    onChange: function(value, text, $choice) {
                        var selectedTags = $('.ui.modal.js-add-bookmark .ui.dropdown').dropdown('get value');
                        $timeout(function() {
                            $scope.tagsError = (selectedTags.length == 0 || selectedTags.length > 3) && ($('.ui.modal.js-add-bookmark').modal('is active'));
                        });
                    }
                });
            }
        },
    };
});

app.directive('jsMenuInit', function($compile) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            if ($scope.$last === true) {
                console.log('jsMenuInit......')
                $('.js-bookmark-dropdown').dropdown({
                    action: 'hide',
                    on: 'hover',
                });

                $('.js-bookmark-dropdown .ui.checkbox').checkbox();
                $('.ui.checkbox.js-radio-navigate').checkbox('check');
                $('.ui.menu a.item').on('click', function() {
                    $(this).addClass('selected').siblings().removeClass('selected');
                });

                $(".ui.menu a.item:first").hover(
                    function() {
                        $('.js-bookmark-dropdown').dropdown('show');
                    },
                    function() {
                        setTimeout(() => {
                            if ($('.js-menu-option:hover').length === 0) {
                                $('.js-bookmark-dropdown').dropdown('hide');
                            }
                        }, 100)
                    }
                );

                $('.ui.menu a.item').on('click', function() {
                    $(this).addClass('selected').siblings().removeClass('selected');
                });
            }
        },
    };
});
