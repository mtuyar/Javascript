const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');

const form = document.getElementById('form-rehber');
const kisiLİstei = document.querySelector('.kisi-listesi');

form.addEventListener('submit', kaydet);
kisiLİstei.addEventListener('click', kisiIslemleriniYap);

let secilenSatir = undefined;

function kisiIslemleriniYap(event){
   if (event.target.classList.contains('bt--delete')) {
       rehberdensil(event.target.parentElement.parentElement);
       document.querySelector('.button-primary').value = 'Kaydet';
   }
   else if (event.target.classList.contains('bt--edit')){
       document.querySelector('.button-primary').value = 'Güncelle';
       const secilenTr = event.target.parentElement.parentElement;
       const guncellenenKisi = secilenTr.cells[2].textContent;
       
       ad.value = secilenTr.cells[0].textContent;
       soyad.value = secilenTr.cells[1].textContent;
       mail.value = secilenTr.cells[2].textContent;
       secilenSatir = secilenTr;
       console.log(secilenSatir);
   }
}

function rehberdensil(silinecekElement){
    silinecekElement.remove();
}


function kaydet(e){
    e.preventDefault();
    
    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }
    const sonuc = verileriKontrolEt(eklenecekKisi);
    if (sonuc.durum){
        if (secilenSatir){
            kisiyiGuncelle(eklenecekKisi)
        }    
        else {
            kisiyiEkle(eklenecekKisi);
        }
       
        //bilgiOlustur(sonuc.mesaj,sonuc.durum);
    }
    else {
        bilgiOlustur(sonuc.mesaj,sonuc.durum);
    }
    //console.log(eklenecekKisi);
}


function kisiyiGuncelle(kisi){
    secilenSatir.cells[0].textContent = kisi.ad
    secilenSatir.cells[1].textContent = kisi.soyad
    secilenSatir.cells[2].textContent = kisi.mail

    document.querySelector('.button-primary').value = 'Kaydet';
    secilenSatir=undefined;
}


function verileriKontrolEt(kisi){
        for(const deger in kisi){
            if (kisi[deger]){
                console.log(kisi[deger]);
            }
            else{
                const sonuc = {
                    durum:false,
                    mesaj: 'Boş alan bırakmayınız'
                }
                return sonuc;
            }
        }
        alanlariTemizle();
        return {
            durum: true,
            mesaj: 'Kaydedildi'
        }     
}

function bilgiOlustur(mesaj,durum){
        const olusanBilgi = document.createElement('div');
        olusanBilgi.textContent = mesaj;
        olusanBilgi.className='bilgi';
        document.querySelector('.container').insertBefore(olusanBilgi,form);

        if (durum) {
            olusanBilgi.classList.add('bilgi--success');
        }
        else{
            olusanBilgi.classList.add('bilgi--error');
        } 
}

function alanlariTemizle(){
    ad.value="";
    soyad.value="";
    mail.value="";
}

function kisiyiEkle(eklenecekKisi){
    const TrElementi = document.createElement('tr');
    TrElementi.innerHTML = `<td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn bt--edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn bt--delete"><i class="fa-solid fa-trash-can"></i></button>
    </td>`;
    kisiLİstei.appendChild(TrElementi);
    



}

setInterval(function ()  {
        const silinecekDiv = document.querySelector('.bilgi');
        if (silinecekDiv) {
            console.log("a");
            silinecekDiv.remove();
            alanlariTemizle();
        }
        
},4000);
