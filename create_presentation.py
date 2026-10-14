import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Initialize Presentation
prs = Presentation()
# Set 16:9 Widescreen dimensions
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Paths
ASSETS_DIR = r"c:\Users\PC\3D Objects\projet_educatif\cyber-kidscd\public\assestes"
OUTPUT_FILE = r"c:\Users\PC\3D Objects\projet_educatif\cyber-kidscd\Rapport_Jeu_CyberSecurite_RED_PHOENIX.pptx"

# Color Palette (Dark Cyber Premium)
COLOR_BG_DARK = RGBColor(11, 17, 32)        # #0B1120 Very deep navy
COLOR_CARD_DARK = RGBColor(19, 29, 54)      # #131D36 Elevated card navy
COLOR_BORDER = RGBColor(30, 41, 69)         # #1E2945 Card border
COLOR_RED_PHOENIX = RGBColor(225, 29, 72)   # #E11D48 Crimson red
COLOR_CYAN = RGBColor(6, 182, 212)          # #06B6D4 Cyber cyan
COLOR_AMBER = RGBColor(245, 158, 11)        # #F59E0B Golden amber
COLOR_EMERALD = RGBColor(16, 185, 129)      # #10B981 Safe emerald
COLOR_TEXT_WHITE = RGBColor(255, 255, 255)  # White
COLOR_TEXT_MUTED = RGBColor(148, 163, 184)  # Slate 400
COLOR_TEXT_BLUE = RGBColor(186, 230, 253)   # Sky 200

blank_slide_layout = prs.slide_layouts[6]

def set_slide_background(slide, color=COLOR_BG_DARK):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, title_text, category_text="RED PHOENIX • CYBER SECURITY ACADEMY"):
    # Category tag
    tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.35))
    tf_tag = tag_box.text_frame
    tf_tag.word_wrap = True
    p_tag = tf_tag.paragraphs[0]
    p_tag.text = category_text.upper()
    p_tag.font.size = Pt(11)
    p_tag.font.bold = True
    p_tag.font.color.rgb = COLOR_RED_PHOENIX

    # Main Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.8))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    p_title = tf_title.paragraphs[0]
    p_title.text = title_text
    p_title.font.size = Pt(26)
    p_title.font.bold = True
    p_title.font.color.rgb = COLOR_TEXT_WHITE

def add_card(slide, left, top, width, height, bg_color=COLOR_CARD_DARK, border_color=COLOR_BORDER):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)
    else:
        card.line.fill.background()
    return card

def safe_add_image(slide, image_name, left, top, width, height):
    img_path = os.path.join(ASSETS_DIR, image_name)
    if os.path.exists(img_path):
        return slide.shapes.add_picture(img_path, left, top, width, height)
    return None

# ==========================================
# SLIDE 1 : COUVERTURE & TITRE
# ==========================================
slide1 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide1)

# Subtle decorative banner
accent_bar = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.35), prs.slide_width, Inches(0.15))
accent_bar.fill.solid()
accent_bar.fill.fore_color.rgb = COLOR_RED_PHOENIX
accent_bar.line.fill.background()

# Logo
safe_add_image(slide1, "logo.jpeg", Inches(0.8), Inches(0.8), Inches(1.3), Inches(1.3))

# Badge Club
badge_box = slide1.shapes.add_textbox(Inches(2.3), Inches(0.9), Inches(8), Inches(0.4))
tf_b = badge_box.text_frame
p_b = tf_b.paragraphs[0]
p_b.text = "CLUB DE CYBERSÉCURITÉ • ENSA OUJDA"
p_b.font.size = Pt(13)
p_b.font.bold = True
p_b.font.color.rgb = COLOR_AMBER

uni_box = slide1.shapes.add_textbox(Inches(2.3), Inches(1.25), Inches(8), Inches(0.4))
tf_u = uni_box.text_frame
p_u = tf_u.paragraphs[0]
p_u.text = "École Nationale des Sciences Appliquées • Université Mohammed Premier"
p_u.font.size = Pt(11)
p_u.font.color.rgb = COLOR_TEXT_MUTED

# Big Title
main_title = slide1.shapes.add_textbox(Inches(0.8), Inches(2.3), Inches(7.5), Inches(2.0))
tf_mt = main_title.text_frame
tf_mt.word_wrap = True
p_mt1 = tf_mt.paragraphs[0]
p_mt1.text = "LE CHÂTEAU NUMÉRIQUE"
p_mt1.font.size = Pt(40)
p_mt1.font.bold = True
p_mt1.font.color.rgb = COLOR_TEXT_WHITE

p_mt2 = tf_mt.add_paragraph()
p_mt2.text = "Éduquer les Enfants aux Fondements de la Cybersécurité par le Jeu"
p_mt2.font.size = Pt(18)
p_mt2.font.color.rgb = COLOR_CYAN
p_mt2.space_before = Pt(10)

# Description box
desc_box = slide1.shapes.add_textbox(Inches(0.8), Inches(4.5), Inches(6.8), Inches(1.8))
tf_desc = desc_box.text_frame
tf_desc.word_wrap = True
p_d = tf_desc.paragraphs[0]
p_d.text = "Un jeu éducatif interactif, bilingue (Français / Arabe) et responsive, conçu par les élèves-ingénieurs de l'ENSA Oujda pour initier les plus jeunes à l'hygiène numérique, à la protection de la vie privée et à la détection des pièges du web."
p_d.font.size = Pt(12)
p_d.font.color.rgb = COLOR_TEXT_MUTED

# Right visuals : Castle + Hero
safe_add_image(slide1, "img1_chateau.png", Inches(8.2), Inches(1.3), Inches(4.4), Inches(4.0))
safe_add_image(slide1, "img2_heros.png", Inches(9.8), Inches(3.6), Inches(2.7), Inches(3.5))


# ==========================================
# SLIDE 2 : LE CLUB RED PHOENIX (ENSA OUJDA)
# ==========================================
slide2 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide2)
add_header(slide2, "Le Club RED PHOENIX — ENSA Oujda", "IDENTITÉ & MISSION")

# Intro box
intro_card = add_card(slide2, Inches(0.8), Inches(1.6), Inches(11.7), Inches(1.2))
intro_box = slide2.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(11.3), Inches(1.0))
tf_intro = intro_box.text_frame
tf_intro.word_wrap = True
p_in = tf_intro.paragraphs[0]
p_in.text = "Fondé au sein de l'École Nationale des Sciences Appliquées d'Oujda (ENSAO), RED PHOENIX est le club de référence des étudiants en génie informatique et cybersécurité. Sa mission est d'allier rigueur académique, esprit d'innovation et impact sociétal positif."
p_in.font.size = Pt(13)
p_in.font.color.rgb = COLOR_TEXT_BLUE

# 3 Pillars Cards
pillars = [
    {
        "title": "🎯 1. Sensibilisation & Vulgarisation",
        "tag": "CITOYENNETÉ & ENFANCE",
        "desc": "Transmettre la culture cyber aux écoles, collèges et familles. Démystifier les menaces du quotidien et inculquer les bons réflexes dès le plus jeune âge.",
        "color": COLOR_RED_PHOENIX
    },
    {
        "title": "🎓 2. Apprentissage & Compétitions",
        "tag": "EXCELLENCE & CTF",
        "desc": "Organisation d'ateliers techniques de haut niveau : hacking éthique, cryptographie, forensic, sécurité applicative et participation aux compétitions Capture The Flag.",
        "color": COLOR_CYAN
    },
    {
        "title": "💻 3. Projets Cyber & R&D",
        "tag": "INNOVATION & LOGICIELS",
        "desc": "Conception d'outils de sécurité, veille technologique et développement de plateformes web interactives comme ce jeu 'Le Château Numérique'.",
        "color": COLOR_AMBER
    }
]

for i, p in enumerate(pillars):
    x = Inches(0.8 + i * 4.0)
    card = add_card(slide2, x, Inches(3.1), Inches(3.7), Inches(3.7), border_color=p["color"])
    
    t_box = slide2.shapes.add_textbox(x + Inches(0.2), Inches(3.3), Inches(3.3), Inches(3.3))
    tf = t_box.text_frame
    tf.word_wrap = True
    
    p1 = tf.paragraphs[0]
    p1.text = p["tag"]
    p1.font.size = Pt(10)
    p1.font.bold = True
    p1.font.color.rgb = p["color"]
    
    p2 = tf.add_paragraph()
    p2.text = p["title"]
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_TEXT_WHITE
    p2.space_before = Pt(8)
    
    p3 = tf.add_paragraph()
    p3.text = p["desc"]
    p3.font.size = Pt(11)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p3.space_before = Pt(12)


# ==========================================
# SLIDE 3 : POURQUOI UN JEU POUR ENFANTS ?
# ==========================================
slide3 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide3)
add_header(slide3, "Pourquoi Enseigner la Cybersécurité par le Jeu ?", "PÉDAGOGIE & PSYCHOLOGIE")

# Left Column: Problematic & Solution
add_card(slide3, Inches(0.8), Inches(1.6), Inches(6.5), Inches(5.2))
txt_pedago = slide3.shapes.add_textbox(Inches(1.1), Inches(1.8), Inches(5.9), Inches(4.8))
tf_p = txt_pedago.text_frame
tf_p.word_wrap = True

p_h = tf_p.paragraphs[0]
p_h.text = "Le Défi Actuel des Enfants Face aux Écrans :"
p_h.font.size = Pt(15)
p_h.font.bold = True
p_h.font.color.rgb = COLOR_AMBER

bullets = [
    ("Une exposition précoce :", "Dès 6-8 ans, les enfants utilisent des tablettes, YouTube, Roblox et des réseaux sans connaître les risques."),
    ("Les discours moralisateurs échouent :", "Dire 'ne parle pas aux inconnus' est trop abstrait. L'enfant ne fait pas le lien avec un jeu vidéo ou un faux cadeau."),
    ("La force de la métaphore ludique :", "En associant un mot de passe à une clé magique et un hacker à un loup rusé, l'enfant comprend instinctivement et mémorise."),
    ("Remplacer la peur par le pouvoir d'agir :", "Le but n'est pas d'effrayer l'enfant, mais de lui donner la fierté d'être un 'Cyber-Héros' capable de défendre son propre château.")
]

for title, text in bullets:
    p_item = tf_p.add_paragraph()
    p_item.text = f"• {title} "
    p_item.font.bold = True
    p_item.font.size = Pt(11)
    p_item.font.color.rgb = COLOR_TEXT_WHITE
    p_item.space_before = Pt(10)
    
    run = p_item.add_run()
    run.text = text
    run.font.bold = False
    run.font.color.rgb = COLOR_TEXT_MUTED

# Right Visuals Card
add_card(slide3, Inches(7.7), Inches(1.6), Inches(4.8), Inches(5.2), border_color=COLOR_CYAN)
safe_add_image(slide3, "img2_heros.png", Inches(8.3), Inches(1.9), Inches(3.6), Inches(4.5))


# ==========================================
# SLIDE 4 : LES 7 MISSIONS — VUE D'ENSEMBLE
# ==========================================
slide4 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide4)
add_header(slide4, "La Carte des 7 Missions du Royaume", "ARCHITECTURE DU PARCOURS")

missions_summary = [
    ("Mission 1", "La Clé Magique", "Mots de passe forts & Runes d'énergie", "img4_cle.png"),
    ("Mission 2", "Le Piège du Loup", "Détection du Phishing & Faux cadeaux", "img5_loup.png"),
    ("Mission 3", "Le Mur de Flammes", "Le Pare-feu & Filtrage des flux", "img6_parefeu (2).png"),
    ("Mission 4", "Le Coffre aux Trésors", "Données personnelles & Confidentialité", "img7_tresor.png"),
    ("Mission 5", "Le Robot Forgeron", "Mises à jour de sécurité & Patchs", "img8_maj.png"),
    ("Mission 6", "La Sauvegarde Céleste", "Cloud, Sauvegardes & Règle 3-2-1", "img7_sauvegarde.png"),
    ("Mission 7", "Le Tunnel Mystique", "Chiffrement HTTPS & Wi-Fi Public", "img8_tunnel.png"),
]

# 2 rows of missions
for idx, (m_num, m_title, m_concept, m_img) in enumerate(missions_summary):
    if idx < 4:
        col = idx
        row = 0
    else:
        col = idx - 4
        row = 1
        
    x = Inches(0.8 + col * 2.95)
    y = Inches(1.6 + row * 2.65)
    w = Inches(2.75)
    h = Inches(2.45)
    
    add_card(slide4, x, y, w, h)
    safe_add_image(slide4, m_img, x + Inches(0.2), y + Inches(0.2), Inches(1.0), Inches(1.0))
    
    # Text in card
    tb = slide4.shapes.add_textbox(x + Inches(0.15), y + Inches(1.2), Inches(2.45), Inches(1.1))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p1 = tf.paragraphs[0]
    p1.text = m_num.upper()
    p1.font.size = Pt(9)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_RED_PHOENIX
    
    p2 = tf.add_paragraph()
    p2.text = m_title
    p2.font.size = Pt(11)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_TEXT_WHITE
    p2.space_before = Pt(2)
    
    p3 = tf.add_paragraph()
    p3.text = m_concept
    p3.font.size = Pt(9)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p3.space_before = Pt(4)

# 8th item: Trophy in row 1, col 3
x8 = Inches(0.8 + 3 * 2.95)
y8 = Inches(1.6 + 1 * 2.65)
add_card(slide4, x8, y8, Inches(2.75), Inches(2.45), border_color=COLOR_AMBER)
safe_add_image(slide4, "mg10_trophee.png", x8 + Inches(0.2), y8 + Inches(0.2), Inches(1.0), Inches(1.0))

tb8 = slide4.shapes.add_textbox(x8 + Inches(0.15), y8 + Inches(1.2), Inches(2.45), Inches(1.1))
tf8 = tb8.text_frame
tf8.word_wrap = True
p1_8 = tf8.paragraphs[0]
p1_8.text = "SOMMET FINAL"
p1_8.font.size = Pt(9)
p1_8.font.bold = True
p1_8.font.color.rgb = COLOR_AMBER
p2_8 = tf8.add_paragraph()
p2_8.text = "Diplôme Officiel"
p2_8.font.size = Pt(11)
p2_8.font.bold = True
p2_8.font.color.rgb = COLOR_TEXT_WHITE
p3_8 = tf8.add_paragraph()
p3_8.text = "Certification officielle RED PHOENIX ENSAO à imprimer."
p3_8.font.size = Pt(9)
p3_8.font.color.rgb = COLOR_TEXT_MUTED


# ==========================================
# SLIDE 5 : MISSION 1 & 2 DÉTAILLÉES
# ==========================================
slide5 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide5)
add_header(slide5, "Missions 1 & 2 : Mots de Passe & Phishing", "FONDEMENTS 1 & 2")

# Mission 1 Card
add_card(slide5, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.2), border_color=COLOR_CYAN)
safe_add_image(slide5, "img4_cle.png", Inches(1.1), Inches(1.9), Inches(1.6), Inches(1.8))
safe_add_image(slide5, "img3_virus.png", Inches(4.5), Inches(2.1), Inches(1.5), Inches(1.5))

m1_tb = slide5.shapes.add_textbox(Inches(1.1), Inches(3.8), Inches(5.1), Inches(2.8))
tf_m1 = m1_tb.text_frame
tf_m1.word_wrap = True

p_m1_t = tf_m1.paragraphs[0]
p_m1_t.text = "Mission 1 : La Clé Magique"
p_m1_t.font.size = Pt(16)
p_m1_t.font.bold = True
p_m1_t.font.color.rgb = COLOR_CYAN

p_m1_d = tf_m1.add_paragraph()
p_m1_d.text = "• Scénario : Le Glouton-Virus tente de dévorer les fichiers de l'ordinateur.\n• Mécanique de jeu : L'enfant clique sur 4 runes d'énergie (Longueur 8+, Majuscules/Minuscules, Chiffres, Symboles). La jauge passe du rouge au vert et le virus s'enfuit !\n• Règle d'or : Mon mot de passe est mon secret. Je ne le partage qu'avec mes parents."
p_m1_d.font.size = Pt(11)
p_m1_d.font.color.rgb = COLOR_TEXT_WHITE
p_m1_d.space_before = Pt(8)

# Mission 2 Card
add_card(slide5, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.2), border_color=COLOR_RED_PHOENIX)
safe_add_image(slide5, "img5_loup.png", Inches(7.1), Inches(1.9), Inches(1.8), Inches(1.8))
safe_add_image(slide5, "img9_piege.png", Inches(10.4), Inches(2.0), Inches(1.6), Inches(1.6))

m2_tb = slide5.shapes.add_textbox(Inches(7.1), Inches(3.8), Inches(5.1), Inches(2.8))
tf_m2 = m2_tb.text_frame
tf_m2.word_wrap = True

p_m2_t = tf_m2.paragraphs[0]
p_m2_t.text = "Mission 2 : Le Piège du Loup"
p_m2_t.font.size = Pt(16)
p_m2_t.font.bold = True
p_m2_t.font.color.rgb = COLOR_RED_PHOENIX

p_m2_d = tf_m2.add_paragraph()
p_m2_d.text = "• Scénario : Un loup déguisé en mouton offre un cadeau gratuit miraculeux.\n• Mécanique de jeu : Mode détective à 3 rounds (Faux Robux gratuits, faux email de livraison, alerte d'urgence truquée). L'enfant examine les indices suspects et clique sur 'Refuser & Signaler'.\n• Règle d'or : Quand une offre est trop belle pour être vraie, c'est un piège !"
p_m2_d.font.size = Pt(11)
p_m2_d.font.color.rgb = COLOR_TEXT_WHITE
p_m2_d.space_before = Pt(8)


# ==========================================
# SLIDE 6 : MISSION 3 & 4 DÉTAILLÉES
# ==========================================
slide6 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide6)
add_header(slide6, "Missions 3 & 4 : Pare-feu & Vie Privée", "FONDEMENTS 3 & 4")

# Mission 3 Card
add_card(slide6, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.2), border_color=COLOR_AMBER)
safe_add_image(slide6, "img6_parefeu (2).png", Inches(1.1), Inches(1.9), Inches(2.4), Inches(1.7))
safe_add_image(slide6, "img6_bouclier.png", Inches(3.8), Inches(1.9), Inches(2.3), Inches(1.7))

m3_tb = slide6.shapes.add_textbox(Inches(1.1), Inches(3.8), Inches(5.1), Inches(2.8))
tf_m3 = m3_tb.text_frame
tf_m3.word_wrap = True

p_m3_t = tf_m3.paragraphs[0]
p_m3_t.text = "Mission 3 : Le Mur de Flammes (Pare-feu)"
p_m3_t.font.size = Pt(16)
p_m3_t.font.bold = True
p_m3_t.font.color.rgb = COLOR_AMBER

p_m3_d = tf_m3.add_paragraph()
p_m3_d.text = "• Scénario : Les portes du château numérique voient affluer des flux de données.\n• Mécanique de jeu : L'enfant agit comme capitaine de la garde : il clique sur 'Autoriser' pour les amis (email de grand-mère, cours de l'école) et dresse le 'Bouclier de Flammes' pour bloquer les virus et spywares.\n• Règle d'or : Le pare-feu et l'antivirus sont mes gardes du corps invisibles."
p_m3_d.font.size = Pt(11)
p_m3_d.font.color.rgb = COLOR_TEXT_WHITE
p_m3_d.space_before = Pt(8)

# Mission 4 Card
add_card(slide6, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.2), border_color=COLOR_EMERALD)
safe_add_image(slide6, "img7_tresor.png", Inches(8.3), Inches(1.9), Inches(2.6), Inches(1.8))

m4_tb = slide6.shapes.add_textbox(Inches(7.1), Inches(3.8), Inches(5.1), Inches(2.8))
tf_m4 = m4_tb.text_frame
tf_m4.word_wrap = True

p_m4_t = tf_m4.paragraphs[0]
p_m4_t.text = "Mission 4 : Le Coffre aux Trésors"
p_m4_t.font.size = Pt(16)
p_m4_t.font.bold = True
p_m4_t.font.color.rgb = COLOR_EMERALD

p_m4_d = tf_m4.add_paragraph()
p_m4_d.text = "• Scénario : Nos données personnelles sont de précieux trésors convoités.\n• Mécanique de jeu : Grand tri interactif entre le 'Coffre Secret 🔒' (adresse de maison, école, mot de passe) et le 'Jardin Public 🌐' (pseudo de jeu, couleur préférée).\n• Règle d'or : Ne jamais donner mon adresse ou le nom de mon école à des inconnus."
p_m4_d.font.size = Pt(11)
p_m4_d.font.color.rgb = COLOR_TEXT_WHITE
p_m4_d.space_before = Pt(8)


# ==========================================
# SLIDE 7 : MISSION 5, 6 & 7 DÉTAILLÉES
# ==========================================
slide7 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide7)
add_header(slide7, "Missions 5, 6 & 7 : Mises à Jour, Sauvegardes & Chiffrement", "FONDEMENTS 5, 6 & 7")

sub_missions = [
    {
        "num": "Mission 5",
        "title": "Le Robot Forgeron",
        "theme": "Mises à jour & Patchs",
        "desc": "L'armure du cyber-gardien subit des micro-fissures (failles de sécurité). L'enfant aide le robot à souder les brèches avec son marteau magique avant qu'un hacker ne s'y faufile.",
        "img": "img8_maj.png",
        "color": COLOR_CYAN
    },
    {
        "num": "Mission 6",
        "title": "La Sauvegarde Céleste",
        "theme": "Backups & Cloud",
        "desc": "Pour éviter de perdre ses souvenirs en cas de panne ou d'attaque de rançongiciel, l'enfant active le rayon d'un coffre volant pour aspirer et mettre à l'abri ses fichiers précieux.",
        "img": "img7_sauvegarde.png",
        "color": COLOR_TEXT_BLUE
    },
    {
        "num": "Mission 7",
        "title": "Le Tunnel Mystique",
        "theme": "Chiffrement HTTPS & Wi-Fi",
        "desc": "Sur un Wi-Fi public sans mot de passe, des espions surveillent. L'enfant allume les 3 anneaux d'énergie du tunnel pour chiffrer ses données en code secret indéchiffrable.",
        "img": "img8_tunnel.png",
        "color": COLOR_AMBER
    }
]

for i, sm in enumerate(sub_missions):
    x = Inches(0.8 + i * 4.0)
    add_card(slide7, x, Inches(1.6), Inches(3.7), Inches(5.2), border_color=sm["color"])
    safe_add_image(slide7, sm["img"], x + Inches(0.8), Inches(1.9), Inches(2.1), Inches(2.0))
    
    tb = slide7.shapes.add_textbox(x + Inches(0.2), Inches(4.1), Inches(3.3), Inches(2.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p1 = tf.paragraphs[0]
    p1.text = sm["num"].upper()
    p1.font.size = Pt(10)
    p1.font.bold = True
    p1.font.color.rgb = sm["color"]
    
    p2 = tf.add_paragraph()
    p2.text = sm["title"]
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_TEXT_WHITE
    p2.space_before = Pt(2)
    
    p3 = tf.add_paragraph()
    p3.text = sm["desc"]
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p3.space_before = Pt(8)


# ==========================================
# SLIDE 8 : LE DIPLÔME OFFICIEL & LA RÉCOMPENSE
# ==========================================
slide8 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide8)
add_header(slide8, "La Consécration : Diplôme du Jeune Cyber-Gardien", "VALORISATION & MOTIVATION")

# Left Column: Features of Diploma
add_card(slide8, Inches(0.8), Inches(1.6), Inches(6.8), Inches(5.2))
tb_dip = slide8.shapes.add_textbox(Inches(1.1), Inches(1.8), Inches(6.2), Inches(4.8))
tf_d = tb_dip.text_frame
tf_d.word_wrap = True

p_dt = tf_d.paragraphs[0]
p_dt.text = "Un Certificat d'Excellence Personnalisé et Imprimable :"
p_dt.font.size = Pt(15)
p_dt.font.bold = True
p_dt.font.color.rgb = COLOR_AMBER

dip_points = [
    ("Personnalisation en direct :", "L'enfant entre son prénom et son diplôme officiel est généré instantanément."),
    ("Validation des 7 compétences :", "Chaque mission réussie est attestée par un badge (Mots de passe, Phishing, Pare-feu, Vie privée, Mises à jour, Sauvegardes, HTTPS)."),
    ("Sceau d'ingénieur RED PHOENIX 2026 :", "Le diplôme porte le sceau officiel du club de cybersécurité de l'ENSA Oujda."),
    ("Bouton d'impression & Téléchargement :", "Grâce à une mise en page CSS print optimisée, l'enfant ou l'enseignant peut imprimer le diplôme en haute qualité sur papier pour l'afficher fièrement."),
    ("Célébration sonore & Confettis :", "Pluie de confettis dorés et fanfare Web Audio API pour marquer ce moment de réussite valorisant.")
]

for title, text in dip_points:
    p_item = tf_d.add_paragraph()
    p_item.text = f"• {title} "
    p_item.font.bold = True
    p_item.font.size = Pt(11)
    p_item.font.color.rgb = COLOR_TEXT_WHITE
    p_item.space_before = Pt(10)
    
    run = p_item.add_run()
    run.text = text
    run.font.bold = False
    run.font.color.rgb = COLOR_TEXT_MUTED

# Right Column: Trophy & Logo
add_card(slide8, Inches(8.0), Inches(1.6), Inches(4.5), Inches(5.2), border_color=COLOR_AMBER)
safe_add_image(slide8, "mg10_trophee.png", Inches(8.8), Inches(2.0), Inches(2.9), Inches(3.2))
safe_add_image(slide8, "logo.jpeg", Inches(9.6), Inches(5.3), Inches(1.3), Inches(1.3))


# ==========================================
# SLIDE 9 : LA STACK TECHNIQUE & ARCHITECTURE
# ==========================================
slide9 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide9)
add_header(slide9, "Technologies & Architecture du Jeu", "STACK TECHNIQUE")

tech_cards = [
    ("TypeScript", "LANGAGE MODERNE", "Typage statique strict garantissant un code robuste sans erreurs d'exécution inattendues.", COLOR_CYAN),
    ("Next.js 16 & React 19", "MOTEUR WEB D'ÉLITE", "Architecture App Router, pré-rendu ultra-rapide et gestion des routes dynamique.", COLOR_RED_PHOENIX),
    ("Tailwind CSS v4", "DESIGN CYBER & RESPONSIVE", "Système d'affichage fluide sur smartphones (iOS/Android), tablettes et écrans PC.", COLOR_TEXT_BLUE),
    ("Framer Motion v14", "PHYSIQUE & ANIMATIONS", "Micro-interactions réalistes, effets de flottement, secousses et retours visuels immédiats.", COLOR_AMBER),
    ("Web Audio API", "SYNTHÉSE SONORE EN DIRECT", "Synthétiseur audio rétro/arcade autonome sans aucun fichier audio lourd externe.", COLOR_EMERALD),
    ("Bilinguisme Arabe / Français", "INTERNATIONALISATION", "Gestion dynamique RTL/LTR avec Google Fonts adaptées (Cairo pour l'arabe, Inter pour le français).", COLOR_RED_PHOENIX)
]

for idx, (t_name, t_sub, t_desc, t_col) in enumerate(tech_cards):
    col = idx % 3
    row = idx // 3
    x = Inches(0.8 + col * 4.0)
    y = Inches(1.6 + row * 2.7)
    
    add_card(slide9, x, y, Inches(3.7), Inches(2.4), border_color=t_col)
    
    tb = slide9.shapes.add_textbox(x + Inches(0.2), y + Inches(0.2), Inches(3.3), Inches(2.0))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p1 = tf.paragraphs[0]
    p1.text = t_sub
    p1.font.size = Pt(9)
    p1.font.bold = True
    p1.font.color.rgb = t_col
    
    p2 = tf.add_paragraph()
    p2.text = t_name
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_TEXT_WHITE
    p2.space_before = Pt(4)
    
    p3 = tf.add_paragraph()
    p3.text = t_desc
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p3.space_before = Pt(8)


# ==========================================
# SLIDE 10 : CONCLUSION & PERSPECTIVES
# ==========================================
slide10 = prs.slides.add_slide(blank_slide_layout)
set_slide_background(slide10)
add_header(slide10, "Impact & Perspectives d'Avenir", "VISION RED PHOENIX")

add_card(slide10, Inches(0.8), Inches(1.6), Inches(7.5), Inches(5.2))
tb_c = slide10.shapes.add_textbox(Inches(1.1), Inches(1.8), Inches(6.9), Inches(4.8))
tf_c = tb_c.text_frame
tf_c.word_wrap = True

p_ct = tf_c.paragraphs[0]
p_ct.text = "La Suite de l'Aventure pour le Club :"
p_ct.font.size = Pt(16)
p_ct.font.bold = True
p_ct.font.color.rgb = COLOR_AMBER

c_points = [
    ("Déploiement en Milieu Scolaire :", "Organiser des ateliers de sensibilisation dans les écoles primaires et collèges de la région de l'Oriental avec le jeu comme support interactif."),
    ("Mode Multijoueur & CTF Junior :", "Faire évoluer le projet vers un défi compétitif où des équipes d'enfants collaborent pour défendre le château contre des vagues de cyber-attaques."),
    ("Fierté Universitaire & Rayonnement :", "Prouver que les élèves-ingénieurs de l'ENSA Oujda conçoivent des solutions concrètes au service de la société marocaine."),
    ("Un Internet plus sûr pour nos enfants :", "Remplacer l'insouciance par la vigilance, et la vulnérabilité par la compétence numérique.")
]

for title, text in c_points:
    p_item = tf_c.add_paragraph()
    p_item.text = f"• {title} "
    p_item.font.bold = True
    p_item.font.size = Pt(11)
    p_item.font.color.rgb = COLOR_TEXT_WHITE
    p_item.space_before = Pt(12)
    
    run = p_item.add_run()
    run.text = text
    run.font.bold = False
    run.font.color.rgb = COLOR_TEXT_MUTED

# Right Card : Contacts & Socials
add_card(slide10, Inches(8.7), Inches(1.6), Inches(3.8), Inches(5.2), border_color=COLOR_RED_PHOENIX)
safe_add_image(slide10, "logo.jpeg", Inches(9.8), Inches(2.0), Inches(1.6), Inches(1.6))

tb_soc = slide10.shapes.add_textbox(Inches(9.0), Inches(3.8), Inches(3.2), Inches(2.8))
tf_s = tb_soc.text_frame
tf_s.word_wrap = True

p_s1 = tf_s.paragraphs[0]
p_s1.text = "RED PHOENIX CLUB"
p_s1.font.size = Pt(14)
p_s1.font.bold = True
p_s1.font.color.rgb = COLOR_TEXT_WHITE

p_s2 = tf_s.add_paragraph()
p_s2.text = "ENSA Oujda — Maroc\n\n💬 WhatsApp : +212 762-902954\n📸 Instagram : @r3d.phoenix\n🎵 TikTok : @redphoenixclub\n\nEngineered with ❤️ for Kids"
p_s2.font.size = Pt(11)
p_s2.font.color.rgb = COLOR_TEXT_MUTED
p_s2.space_before = Pt(10)

# Save presentation
prs.save(OUTPUT_FILE)
print(f"Presentation saved successfully to: {OUTPUT_FILE}")
