var marker = new window.TMap.Label({
                position: [39.98412, 116.307484],
                map: map,
                content: "文本标注",
            });
            // var marker = new qq.maps.Marker({
            //     position: myLatlng,
            //     map: map,
            // });
            // var anchor = new qq.maps.Point(300, 0),
            //     size = new qq.maps.Size(600, 680),
            //     origin = new qq.maps.Point(-150, 0),
            //     markerIcon = new qq.maps.MarkerImage(
            //         "/static/images/position.png",
            //         size,
            //         origin,
            //         anchor
            //     );
            // marker.setIcon(markerIcon);

            new window.TMap.DOMOverlay({
                map,
                onInit: function (options) {
                    console.log(1);
                    this.position = options.position;
                    this.url = options.url;
                    this.width = options.width || 20;
                    this.height = options.height || 20;
                },
                createDOM: function () {
                    console.log(1);
                    var img = document.createElement("img");
                    img.style.height = "80px";
                    img.style.width = "240px";
                    img.src = this.url;
                    return img;
                },
                updateDOM: function () {
                    console.log(2);
                    if (!this.map) {
                        return;
                    }
                    // 经纬度坐标转转容器像素坐标
                    var pixel = this.map.projectToContainer(this.position);
                    // 使图中心点对齐经纬度坐标点
                    var width = this.dom.clientWidth / 2;
                    var left = pixel.getX() - width + "px";
                    var top = pixel.getY() - this.dom.clientHeight + "px";
                    this.dom.style.transform = `translate(${left}, ${top})`;
                },
                position: new window.TMap.LatLng(39.96030543872138, 116.25809083213608), // 动态图放置位置
                url: "https://mapapi.qq.com/web/visualization/demo-asset/flame.gif", // 路径
                width: 80, // 宽度
                height: 240, // 高度
            });
            // var infoWin = new window.TMap.maps.InfoWindow({
            //     map: map,
            // });
            // var marker = new window.TMap.maps.Marker({
            //     position: new window.TMap.maps.LatLng(39.98412, 116.307484),
            //     map: map,
            // });

            //添加标记
            // for (let i = 0; i < data.length; i++) {
            //     var marker = new qq.maps.Marker({
            //         position: new qq.maps.LatLng(data[i].lat, data[i].lng),
            //         map: map,
            //     });
            //     marker.libraryName = data[i].libraryName;
            //     qq.maps.event.addListener(marker, "click", function () {
            //         infoWin.open();
            //         infoWin.setContent(
            //             '<div style="text-align:center;white-space:' +
            //                 'nowrap;margin:10px;"> ' +
            //                 this.libraryName +
            //                 " </div>"
            //         );
            //         //提示窗位置
            //         infoWin.setPosition(new qq.maps.LatLng(data[i].lat, data[i].lng));
            //     });
            // }

            // var flameList = [
            //     new Flame({
            //         map,
            //         position: new TMap.LatLng(39.96030543872138, 116.25809083213608), // 动态图放置位置
            //         url: "https://mapapi.qq.com/web/visualization/demo-asset/flame.gif", // 路径
            //         width: 80, // 宽度
            //         height: 240, // 高度
            //     }),
            // ];