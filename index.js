const fs = require("fs");
const path = "./notlar.json";

const komut = process.argv[2];
const arguman = process.argv.slice(3);

function dosyayiKontrolEt() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "[]");
    }
}

function notEkle(yeniNot) {
    try {
        dosyayiKontrolEt();
        const veriler = JSON.parse(fs.readFileSync(path));
        const yeniID = veriler.length ? veriler[veriler.length - 1].id + 1 : 1;
        veriler.push({ id: yeniID, mesaj: yeniNot });
        fs.writeFileSync(path, JSON.stringify(veriler, null, 2));
        console.log(" Not eklendi.");
    } catch (err) {
        console.error(" Not eklenemedi:", err.message);
    }
}

function notlariListele() {
    try {
        dosyayiKontrolEt();
        const veriler = JSON.parse(fs.readFileSync(path));
        if (veriler.length === 0) {
            console.log("Hiç not yok.");
            return;
        }
        veriler.forEach(not => {
            console.log(`${not.id} - ${not.mesaj}`);
        });
    } catch (err) {
        console.error("Notlar okunamadı:", err.message);
    }
}

function notSil(id) {
    try {
        dosyayiKontrolEt();
        let veriler = JSON.parse(fs.readFileSync(path));
        const uzunlukIlk = veriler.length;
        veriler = veriler.filter(not => not.id !== parseInt(id));
        if (veriler.length === uzunlukIlk) {
            console.log(" Belirtilen ID bulunamadı.");
            return;
        }
        fs.writeFileSync(path, JSON.stringify(veriler, null, 2));
        console.log(" Not silindi.");
    } catch (err) {
        console.error(" Not silinemedi:", err.message);
    }
}

switch (komut) {
    case "ekle":
        notEkle(arguman.join(" "));
        break;
    case "listele":
        notlariListele();
        break;
    case "sil":
        notSil(arguman[0]);
        break;
    default:
        console.log(" Geçerli bir komut giriniz: ekle, listele, sil");
}
