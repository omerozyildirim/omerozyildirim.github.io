 
var CallBackTiklaninca = function () { }
var CallBackTiklamaKaldir = function () { CallBackTiklaninca = function () { } }
var CallBackSonTiklananNokta = function () { }
var CallBackZoomSeviyesi = function () { }
var CallBackHaritaOrtaNokta = function () { }
var CallBackKonumaGit = function () { }
var CallBackSadeceHarita = function () { }
var CallBackAltlikKatmanListele = function () { }
var CallBackAltlikKatmanGetir = function () { }
var CallBackAltlikKatmanAyarla = function () { }
var CallBackIsaretciYerDegistirince = function () { }
var CallBackIsaretciEkle = function () { }
var CallBackTopluIsaretciEkle = function () { }
var CallBackIsaretciTemizle = function () { }
var CallBackCiz = function () { }
var CallBackCizimTemizle = function () { }
var CallBackCizimEditoruGetir = function () { }
var CallBackCizimPasiflestir = function () { }
var CallBackCizimDuzenle = function () { }
var CallBackCizimSil = function () { }
var CallBackTurileCizim = function () { }
var CallBackCizimSec = function () { }
var CallBackYakinimdaAra = function () { }
var CallBackYolTarifi = function () { }
var CallBackTUBS = function () { }
var CallBackPanorama = function () { }
var CallBackTrafik = function () { }
var CallBackArama = function () { }
var CallBackYazdir = function () { }
var CallBackEczane = function () { }
var CallBackSpor = function () { }
var CallBackSosyal = function () { }
var CallBackIletisim = function () { }
var CallBackKatmanEkle = function () { }
var CallBackKatmanKaldir = function () { }
var CallBackKatmanYoneticisiGetir = function () { }
var CallBackItrfWgs84Donusumu = function () { }
var CallBackWgs84ItrfDonusumu = function () { }
var CallBackAracCubugu = function () { }
var CallBackBoyut = function () { }
var CallBackAlan = function () { }

function SehirHaritasiAPI(mapFrame, callback) {
    this.version = "1.1";
    this.updateDate = "26.01.2016";

    // Harita penceresini yakalayabilmek için yardımcı metod
    var GetIframeWindow = function (iframe_object) {
        var doc;

        if (iframe_object.contentWindow) {
            return iframe_object.contentWindow;
        }

        if (iframe_object.window) {
            return iframe_object.window;
        }

        if (!doc && iframe_object.contentDocument) {
            doc = iframe_object.contentDocument;
        }

        if (!doc && iframe_object.document) {
            doc = iframe_object.document;
        }

        if (doc && doc.defaultView) {
            return doc.defaultView;
        }

        if (doc && doc.parentWindow) {
            return doc.parentWindow;
        }

        return undefined;
    }

    /// API KEY iletişimi
    var Ajax = function (url, data, callback, errorback) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText, data);
            }
        }
        xhr.onerror = function () {
            errorback(xhr, arguments);
        }
        xhr.open('GET', url + "&" + data, true);
        //xhr.responseType = 'json';
        //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        //xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();
    }
    Ajax("http://cbsproxy.ibb.gov.tr/?UserKeyStatisticsAdd", "apikey=" + "ac5c005a26d54653bce2d71e77c726da",
    function (data, params) {
    },
    function (x, a) {
    });

    // Iframe iletişimi
    var MapListener = function (event) {
        var origin = event.origin;
        var splitted = event.data.split("|");
        var methodName = splitted[0];
        var args = [];
        if (splitted.length > 1)
            for (var i = 1; i < splitted.length; i++) {
                args.push(splitted[i]);
            }
        switch (methodName) {
            case "Tiklaninca":
            case "TiklamaKaldir":
            case "SonTiklananNokta":
            case "ZoomSeviyesi":
            case "HaritaOrtaNokta":
            case "KonumaGit":
            case "SadeceHarita":
            case "AltlikKatmanListele":
            case "AltlikKatmanGetir":
            case "AltlikKatmanSec":
            case "MarkerEkle":
            case "TopluMarkerEkle":
            case "MarkerTemizle":
            case "IsaretciEkle":
            case "IsaretciYerDegistirince":
            case "TopluIsaretciEkle":
            case "IsaretciTemizle":
            case "Ciz":
            case "CizimTemizle":
            case "TurileCizim":
            case "CizimPasiflestir":
            case "CizimSec":
            case "CizimDuzenle":
            case "CizimSil":
            case "YakinimdaAra":
            case "YolTarifi":
            case "TUBS":
            case "Panorama":
            case "Trafik":
            case "Arama":
            case "Yazdir":
            case "Eczane":
            case "Spor":
            case "Sosyal":
            case "Iletisim":
            case "KatmanEkle":
            case "KatmanKaldir":
            case "KatmanYoneticisiGetir":
            case "CizimEditoruGetir":
            case "Wgs84ItrfDonusumu":
            case "ItrfWgs84Donusumu":
            case "AracCubugu":
            case "Boyut":
            case "Alan":
                if (methodName.indexOf("Marker") > -1) {
                    if (methodName == "MarkerEkle")
                        methodName = "IsaretciEkle";
                    else if (methodName == "TopluMarkerEkle")
                        methodName = "TopluIsaretciEkle";
                    else if (methodName == "MarkerTemizle")
                        methodName = "IsaretciTemizle";
                }
                eval("CallBack" + methodName + "(" + args + ");");
                if (methodName != "Tiklaninca" && methodName != "TiklamaKaldir" && methodName != "HaritaOrtaNokta") {
                    // bir çok metod işlevini bir kez gerçekleştirip default hale dönmeli
                    eval("var CallBack" + methodName + " = function(){ }");
                }
                break;
            default:
                break;
        }
    }
    // Event Listener aktifleştirmesi
    if (window.addEventListener) {
        addEventListener("message", MapListener, false)
    } else {
        attachEvent("onmessage", MapListener)
    }

    // Haritada bir konuma tıklanınca çağrılacak metod
    this.Tiklaninca = function (callback) {
        if (callback) {
            CallBackTiklaninca = callback;
            var el = document.getElementById(mapFrame);
            GetIframeWindow(el).postMessage("Tiklaninca|", "*");
        }
    }
    // Haritaya tıklamalarda geri dönüş bilgisi atamasını kaldır
    this.TiklamaKaldir = function (callback) {
        if (callback)
            CallBackTiklamaKaldir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("TiklamaKaldir|", "*");
    }
    //  Haritada en son tıklanan noktanın lon,lat olarak bilgisini verir
    this.SonTiklananNokta = function (callback) {
        if (callback)
            CallBackSonTiklananNokta = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("SonTiklananNokta|", "*");
    }
    // Haritanın aktif zoom seviyesini verir
    this.ZoomSeviyesi = function (callback) {
        if (callback)
            CallBackZoomSeviyesi = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("ZoomSeviyesi|", "*");
    }
    // Haritanın o anki orta noktasının koordinatlarını lon,lat olarak verir
    this.HaritaOrtaNokta = function (callback) {
        if (callback)
            CallBackHaritaOrtaNokta = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("HaritaOrtaNokta|", "*");
    }
    // Haritada istenilen bir konuma marker atar, zoom çeker ve bilgi penceresi yerleştirir
    this.KonumaGit = function (lat, lon, zoom, effect, callback) {
        if (callback)
            CallBackKonumaGit = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("KonumaGit|" + lat + "|" + lon + "|" + zoom + "|" + effect, "*");
    }
    //tüm menüleri kapatır sadece harita görünür olur.
    this.SadeceHarita = function (callback) {
        if (callback)
            CallBackSadeceHarita = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("SadeceHarita|", "*");
    }
    //haritadaki aktif tüm katmanları getirir.
    this.AltlikKatmanListele = function (callback) {
        if (callback)
            CallBackAltlikKatmanListele = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("AltlikKatmanListele|", "*");
    }
    //haritadaki aktif katmanı getirir.  
    this.AltlikKatmanGetir = function (callback) {
        if (callback)
            CallBackAltlikKatmanGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("AltlikKatmanGetir|", "*");
    }
    //verilen değeri altlık katman olarak ayarlar.
    this.AltlikKatmanAyarla = function (name, callback) {
        if (callback)
            CallBackAltlikKatmanAyarla = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("AltlikKatmanAyarla|" + name, "*");
    }
    // Haritada istenilen bir konuma marker atar, zoom çeker ve bilgi penceresi yerleştirir
    this.MarkerEkle = function (lat, lon, anchorX, anchorY, zoom, effect, content, iconUrl, imageX, imageY, center, toolbar, draggable, showPopover, title, callback) {
        if (callback)
            CallBackIsaretciEkle = callback;
        else
            CallBackIsaretciEkle = function () { }
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("MarkerEkle|" + lat + "|" + lon + "|" + anchorX + "|" + anchorY + "|" + zoom + "|" + effect + "|" + content + "|" + iconUrl + "|" + imageX + "|" + imageY + "|" + center + "|" + toolbar + "|" + draggable + "|" + showPopover + "|" + title, "*");
    }
    //Toplu marker ekleme Yapar
    this.TopluMarkerEkle = function (markers, callback) {
        if (callback)
            CallBackTopluIsaretciEkle = callback;
        else
            CallBackTopluIsaretciEkle = function () { }
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("TopluMarkerEkle|" + markers, "*");
    }
    // Haritayı temizle
    this.MarkerTemizle = function (marker, callback) {
        if (callback)
            CallBackIsaretciTemizle = callback;
        else
            CallBackIsaretciTemizle = function () { }
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("MarkerTemizle|" + marker + "|", "*");
    }
    // Haritada istenilen bir konuma marker atar, zoom çeker ve bilgi penceresi yerleştirir
    this.IsaretciEkle = function (lat, lon, anchorX, anchorY, zoom, effect, content, iconUrl, imageX, imageY, center, toolbar, draggable, showPopover, title, callback) {
        if (callback)
            CallBackIsaretciEkle = callback;
        else
            CallBackIsaretciEkle = function () { }
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("IsaretciEkle|" + lat + "|" + lon + "|" + anchorX + "|" + anchorY + "|" + zoom + "|" + effect + "|" + content + "|" + iconUrl + "|" + imageX + "|" + imageY + "|" + center + "|" + toolbar + "|" + draggable + "|" + showPopover + "|" + title, "*");
    }
    // İşaretçi yer değiştirikce çağrılacak method
    this.IsaretciYerDegistirince = function (callback) {
        if (callback) {
            CallBackIsaretciYerDegistirince = callback;
            var el = document.getElementById(mapFrame);
            GetIframeWindow(el).postMessage("Tiklaninca|", "*");
        }
    }
    //Toplu marker ekleme Yapar
    this.TopluIsaretciEkle = function (markers, callback) {
        if (callback)
            CallBackTopluIsaretciEkle = callback;
        else
            CallBackTopluIsaretciEkle = function () { }
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("TopluIsaretciEkle|" + markers, "*");
    }
    // Haritayı temizle
    this.IsaretciTemizle = function (marker, callback) {
        if (callback)
            CallBackIsaretciTemizle = callback;
        else
            CallBackIsaretciTemizle = function () { }
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("IsaretciTemizle|" + marker + "|", "*");
    }
    //Alınan wkt değerine göre çizim yapar
    this.Ciz = function (wkt, zoom, callback) {
        if (callback)
            CallBackCiz = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Ciz|" + wkt + "|" + zoom, "*");
    }
    //Çizim temizle
    this.CizimTemizle = function (id, callback) {
        if (callback)
            CallBackCizimTemizle = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("CizimTemizle|" + id, "*");
    }
    //Çizim editörü
    this.CizimEditoruGetir = function (callback) {
        if (callback)
            CallBackCizimEditoruGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("CizimEditoruGetir|", "*");
    }
    //Çizim pasifleştir
    this.CizimPasiflestir = function (callback) {
        if (callback)
            CallBackCizimEditoruGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("CizimPasiflestir|", "*");
    }
    //Çizim pasifleştir
    this.CizimSec = function (callback) {
        if (callback)
            CallBackCizimEditoruGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("CizimSec|", "*");
    }
    //Tür ile Çizim
    this.TurileCizim = function (type, callback) {
        if (callback)
            CallBackTurileCizim = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("TurileCizim|" + type + "|true", "*");
    }
    //Çizim düzenler. Öncelikle çizim seç fonksiyonu ile düzeltilmesi gereken çizim seçilir.
    this.CizimDuzenle = function (callback) {
        if (callback)
            CallBackCizimEditoruGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("CizimDuzenle|", "*");
    }
    //Çizim siler. Öncelikle çizim seç fonksiyonu ile silinmesi gereken çizim seçilir.
    this.CizimSil = function (callback) {
        if (callback)
            CallBackCizimEditoruGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("CizimSil|", "*");
    }
    //Yakınımda Arama Yapar
    this.YakinimdaAra = function (lat, lon, tur, mesafe, callback) {
        if (callback)
            CallBackYakinimdaAra = callback;
        var el = document.getElementById(mapFrame);

        GetIframeWindow(el).postMessage("YakinimdaAra|" + lat + "|" + lon + "|" + tur + "|" + mesafe, "*");
    }
    //yol tarifi hesaplar
    this.YolTarifi = function (startLat, startLon, finishLat, finishLon, callback) {
        if (callback)
            CallBackYolTarifi = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("YolTarifi|" + baslaLat + "|" + startLon + "|" + finishLat + "|" + finishLon, "*");
    }
    //toplu taşıma için yol tarifi hesaplar
    this.TUBS = function (startLat, startLon, finishLat, finishLon, type, time, date, callback) {
        if (callback)
            CallBackYolTarifi = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("TUBS|" + startLat + "|" + startLon + "|" + finishLat + "|" + finishLon + "|" + type + "|" + time + "|" + date, "*");
    }
    //verilen koordinata göre panoramayı getirir
    this.Panorama = function (lat, lon, callback) {
        if (callback)
            CallBackPanorama = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Panorama|" + lat + "|" + lon, "*");
    }
    //verilen koordinata göre panoramayı getirir
    this.Trafik = function (callback) {
        if (callback)
            CallBackTrafik = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Trafik|", "*");
    }
    //arama yapar, aramayı pasif hale getirir
    this.Arama = function (active, query, callback) {
        if (callback)
            CallBackArama = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Arama|" + active + "|" + query, "*");
    }
    //yazdirma yapar
    this.Yazdir = function (callback) {
        if (callback)
            CallBackYazdir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Yazdir|", "*");
    }
    //verilen ilçeye göre nöbetçi eczaneleri getirir.
    this.Eczane = function (district, callback) {
        if (callback)
            CallBackEczane = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Eczane|" + district, "*");
    }
    //verilen ilçeyegöre spı-or tesislerini  getirir.
    this.Spor = function (district, callback) {
        if (callback)
            CallBackSpor = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Spor|" + district, "*");
    }
    //verilen ilçeye göre İbb sosyal tesislerini getirir.
    this.Sosyal = function (district, callback) {
        if (callback)
            CallBackSosyal = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Sosyal|" + district, "*");
    }
    //verilen ilçeye göre İbb iletişim noktalarını getirir.
    this.Iletisim = function (district, callback) {
        if (callback)
            CallBackIletisim = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Iletisim|" + district, "*");
    }
    //verilen url'deki  servisi katman olarak ekler.
    this.KatmanEkle = function (url, name, visibility, type, opacity, layers, callback) {
        if (callback)
            CallBackKatmanEkle = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("KatmanEkle|" + url + "|" + name + "|" + visibility + "|" + type + "|" + opacity + "|" + layers, "*");
    }
    // verilen katmanı kaldırır.
    this.KatmanKaldir = function (callback) {
        if (callback)
            CallBackKatmanKaldir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("KatmanKaldir|", "*");
    }
    // kayman yöneticisi ekler
    this.KatmanYoneticisiGetir = function (callback) {
        if (callback)
            CallBackKatmanYoneticisiGetir = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("KatmanYoneticisiGetir|", "*");
    }
    // itrf wgs84 koordinat donusumu yapar
    this.ItrfWgs84Donusumu = function (lat, lon, callback) {
        if (callback)
            CallBackItrfWgs84Donusumu = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("ItrfWgs84Donusumu|" + lat + "|" + lon, "*");
    }
    // wgs84 itrf koordinat donusumu yapar
    this.Wgs84ItrfDonusumu = function (lat, lon, callback) {
        if (callback)
            CallBackWgs84ItrfDonusumu = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Wgs84ItrfDonusumu|" + lat + "|" + lon, "*");
    }
    // Araç çubuğu görünüm ayarları
    this.AracCubugu = function (network, panorama, layers, menu, search, language, traffic, mapSwitch, coordinate, clear, measure, print, location, zoomin, zoomout, rightMenu, callback) {
        if (callback)
            CallBackAracCubugu = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("AracCubugu|" + network + "|" + panorama + "|" + layers + "|" + menu + "|" + search + "|" + language + "|" + traffic + "|" + mapSwitch + "|" + coordinate + "|" + clear + "|" + measure + "|" + print + "|" + location + "|" + zoomin + "|" + zoomout + "|" + rightMenu, "*");
    }

    // boyutu pixel dizisi olarak döndürür {width, height}
    this.Boyut = function (callback) {
        if (callback)
            CallBackBoyut = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Boyut|", "*");
    }

    // alanı koordinatlar dizisi olarak döndürür {minx, miny, maxx, maxy }
    this.Alan = function (callback) {
        if (callback)
            CallBackAlan = callback;
        var el = document.getElementById(mapFrame);
        GetIframeWindow(el).postMessage("Alan|", "*");
    }

    if (callback)
        document.getElementById(mapFrame).onload = function () {
            callback();
        }
}