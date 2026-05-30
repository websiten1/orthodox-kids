# Calea Luminii — Setup & Deployment

## Cerințe

- Node.js 18+
- PostgreSQL (via Supabase recomandat)
- Un cont Supabase gratuit

## Pași de configurare

### 1. Clonați proiectul
```bash
cd calea-luminii
npm install
```

### 2. Creați baza de date Supabase
1. Mergeți la [supabase.com](https://supabase.com) și creați un proiect nou
2. Din Settings → Database, copiați `Connection string (URI)`

### 3. Configurați variabilele de mediu
```bash
cp .env .env.local
```

Editați `.env.local` cu valorile reale:
```
DATABASE_URL="postgresql://postgres:[PAROLA]@db.[PROIECT].supabase.co:5432/postgres"
AUTH_SECRET="[generati cu: openssl rand -base64 32]"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Actualizați și `prisma.config.ts` cu același DATABASE_URL.

### 4. Creați tabelele
```bash
npm run db:push
```

### 5. Populați cu date inițiale (12 teme, sfinți, magazin)
```bash
npm run db:seed
```

### 6. Porniți aplicația
```bash
npm run dev
```

Deschideți [http://localhost:3000](http://localhost:3000)

## Fluxul de utilizare

### Parohie
1. Mergeți la `/parohie/inregistrare` → creați contul parohiei
2. Dashboard → Grupe → creați o grupă (se generează automat codul)
3. Teme → activați temele dorite pentru fiecare grupă
4. Distribuiți codul grupei copiilor

### Copil
1. Mergeți la `/copil` → introduceți codul grupei
2. Creați profil (prenume + inițială + avatar)
3. Salvați codul personal generat automat
4. Explorați harta și completați activitățile

## Deployment pe Vercel

```bash
npx vercel
```

Setați variabilele de mediu în Vercel Dashboard → Settings → Environment Variables.

## Structura proiectului

```
app/
  page.tsx           # Landing page (rutare automată)
  copil/             # Aplicația pentru copii (mobile-first)
    page.tsx         # Intrare cu cod de grupă
    harta/           # Harta principală cu locații
    activitate/[id]/ # Renderer activități (lecție/quiz)
    echipa/          # Pagina echipei + clasament
    joc-echipa/turn/ # Jocul "Turnul Credinței"
    profil/          # Profilul copilului + statistici
    magazin/         # Magazinul de talanți
    sfinti/          # Colecția de sfinți
    camera/          # Camera avatarului
    evanghelie/[id]/ # Evanghelia zilei (duminica)
  parohie/           # Dashboard parohie (desktop-friendly)
    login/           # Autentificare parohie
    inregistrare/    # Înregistrare parohie nouă
    dashboard/       # Pagina principală cu KPI-uri
    grupe/           # Gestionare grupe și copii
    teme/            # Biblioteca de teme
    calendar/        # Planificare calendară
    evanghelie/      # Gestionare evanghelie
    notificari/      # Trimitere notificări
    setari/          # Setările parohiei
  api/               # API Routes (Next.js)
components/
  child/             # Componente pentru copii
  parish/            # Componente pentru parohie
lib/
  auth.ts            # Autentificare JWT (fără dependențe externe)
  prisma.ts          # Client Prisma singleton
  utils.ts           # Utilități
prisma/
  schema.prisma      # Schema completă DB
  seed.ts            # Date inițiale (12 teme, sfinți, magazin)
```

## Note tehnice

- Auth: JWT custom în cookie httpOnly (fără NextAuth pentru simplitate)
- Copiii nu au email/parolă — se autentifică cu cod grupă + token personal
- Toate rutele protejate server-side prin `getChildSession()`/`getParishSession()`
- GDPR: copiii au doar prenume + inițială, fără date personale sensibile
