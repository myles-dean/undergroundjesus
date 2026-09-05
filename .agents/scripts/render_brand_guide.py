import fitz, os
p='attached_assets/Underground_Jesus_1788627532925.pdf'
out='.agents/outputs/brand-guide-pages'
doc=fitz.open(p)
print('pages',doc.page_count)
for i in range(doc.page_count):
    page=doc[i]
    pix=page.get_pixmap(matrix=fitz.Matrix(1.25,1.25), alpha=False)
    pix.save(f'{out}/page-{i+1:02}.png')
