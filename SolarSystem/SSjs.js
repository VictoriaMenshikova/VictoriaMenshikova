function Solar_System(canvas) {

    var w = 840,
    h= 840;	
    var app = Graphics2D.app('#solarsystem', w, h), // размеры слоёв
    background = app.layer(0), //небо
    orbits = app.layer(1),  //траектории
    planets = app.layer(2);  //планеты
	
    var m0 = 1,                         // масса Земли
    den = 1,                       // 1 оборот Земли вокруг своей оси (1 день)
    raststoe = 1,                         // расстояние от Солнца до Земли

    var r0 = 4.2588e-5 * raststoe;            // радиус Земли
    var god = 365.2564 * den;             // 1 оборот Земли вокруг Солнца (1 год)

    var planetarray = [];
    planetarray.push({name:"Солнце",    mass:333000*m0, distance:0.001*raststoe,  radius:109.21*r0, aroundsun:60*den,    phase:0,    color:"#f6e209",    file:"PLANSun.png"});
    planetarray.push({name:"Меркурий",  mass:0.05527*m0, distance:0.387*raststoe, radius:0.3829*r0, aroundsun:87.97*den, phase:0,    color:"#de442c",    file:"PLANMercury.png"});
    planetarray.push({name:"Венера",    mass:0.815*m0,  distance:0.723*raststoe,  radius:0.949*r0, aroundsun:224.7*den,  phase:0,    color:"#e8b633",    file:"PLANVenus.png"});
    planetarray.push({name:"Земля",     mass:1*m0,      distance:1*raststoe,      radius:1*r0,    aroundsun:1*god,       phase:0,    color:"#3e6286",    file:"PLANEarth.png"});
    planetarray.push({name:"Марс",      mass:0.107*m0,  distance:1.523*raststoe,  radius:0.532*r0, aroundsun:1.88*god,   phase:0,    color:"#752814",    file:"PLANMars.png"});
    planetarray.push({name:"Юпитер",    mass:317.8*m0,  distance:5.2*raststoe,    radius:10.97*r0, aroundsun:11.86*god,  phase:0,    color:"#8c694d",    file:"PLANJupiter.png"});
    planetarray.push({name:"Сатурн",    mass:95.2*m0,   distance:9.54*raststoe,   radius:9.45*r0, aroundsun:29.46*god,   phase:0,    color:"#c69e47",    file:"PLANSaturn.png"});
    planetarray.push({name:"Уран",      mass:14.53*m0,  distance:19.19*raststoe,  radius:4*r0,    aroundsun:84.02*god,   phase:0,    color:"#4e659b",    file:"PLANUranus.png"});
    planetarray.push({name:"Нептун",    mass:17.14*m0,  distance:30.06*raststoe,  radius:3.88*r0, aroundsun:164.78*god,  phase:0,    color:"#4e6fbc",    file:"PLANNeptunes.png"});

background.image('Pics/sky.png', 0, 0);

    for (var i = 0; i < planetarray.length; i++) {
        planetarray[i].phase = Math.random() * 360;
    }

    // Основной цикл программы
    function osnova() {
        physics();
        draw();
    }

    // Расчетная часть программы
    function physics() {                                    // то, что происходит каждый шаг времени
        for (var i = 0; i < planetarray.length; i++) {
            planetarray[i].phase += 360 * dt / planetarray[i].aroundsun;
        }
    }

    function picsP()    // загрузка изображений планет
{
        for (var i = 0; i < planetarray.length; i++) {
            if (!planetarray[i].file) continue;
            var pic = new Image();
            pic.src = "Pics/" + planetarray[i].file;
            planetarray[i].pic = pic;
        }
    }

    // Рисование
    function draw() {
        for (var i = 0; i < planetarray.length; i++){
            app.planets = planetarray[i];
            var ro = 1.9 * Math.log(1 + 2.5 * app.planets.distance / raststoe) * raststoe;
            var fi = app.planets.phase / 180 * Math.PI;
            var xS = (w / 2 + ro * Math.cos(fi)) * scale;
            var yS = (h / 2 + ro * Math.sin(fi)) * scale;

            // траектории
            app.beginPath();
            app.arc(w / 2 * scale, h / 2 * scale, ro * scale, 0, 2 * Math.PI, false);
            app.strokeStyle = "#516185";
            app.stroke();

            // космические объекты
            if (p.pic) {
                var r = 0.1 * Math.log(1 + 8 * p.radius / r0) * raststoe * scale;
                var wh = p.pic.width / p.pic.height;
                app.drawImage(p.pic, xS - r * wh, yS - r, r * 2 * wh, r * 2);
            }
        }
    }

    // Запуск системы
    picsP();
    setInterval(osnova, 1000 / 60);

}
