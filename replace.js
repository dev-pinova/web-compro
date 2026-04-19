const fs = require('fs');
const path = require('path');

function walk(d) {
    fs.readdirSync(d).forEach(f => {
        let p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) { 
            walk(p); 
        } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
            let c = fs.readFileSync(p, 'utf8');
            let o = c;
            
            c = c.replace(/Jl\. Jend\. Sudirman No 42, Kebayoran Baru, Jakarta Selatan 12190/g, 'Jl. Adi Sucipto No.154, Kelurahan Jajar, Kecamatan Laweyan, Surakarta 57144');
            c = c.replace(/Jl\. Jend\. Sudirman No\. 42\\nKebayoran Baru, Jakarta Selatan 12190/g, 'Jl. Adi Sucipto No.154\\nKelurahan Jajar, Kecamatan Laweyan, Surakarta 57144');
            c = c.replace(/812-3456-7890/g, '851-0093-0009');
            c = c.replace(/6281234567890/g, '6285100930009');
            c = c.replace(/halo@anugrahjayadesain\.id/g, 'tonygroup8111@gmail.com');
            c = c.replace(/Budi Hartono, S\.T\./g, 'Toni Anugrah');
            c = c.replace(/Budi Hartono/g, 'Toni Anugrah');
            c = c.replace(/\bBudi\b/g, 'Toni');

            if (c !== o) { 
                fs.writeFileSync(p, c); 
                console.log("Updated: " + p);
            }
        }
    });
}

walk('./src');
console.log('Done');
