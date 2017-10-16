import json,os,re
from staticjinja import make_site

#Path to data folder
data_folder = os.path.abspath(os.path.dirname(__file__))
#Replace // and \ with /
data_folder = re.sub(r"(\/\/){1}|(\\){1}", '/', data_folder)

if __name__ == "__main__":
    #Open and Read JSON Files
    try:
        with open(data_folder+'/data.json') as json_file:
            data = json.load(json_file)
    except Exception as e:
        print(e.message)
    for d in data:
        print(d)
    
    site_meta = data["meta"]
    context_home = data["home"]
    context_about = data["about"]
    context_counter = data["counter"]
    context_portfolio = data["portfolio"]
    context_services = data["services"]
    context_testimonials = data["testimonials"]
    context_brands = data["brands"]
    context_team = data["team"]
    context_contact = data["contact"]
    context_links = data["links"]
    #Create Contexts
    context_main = {
        "meta": site_meta,
        "home": context_home,
        "about": context_about,
        "counter": context_counter,
        "portfolio": context_portfolio,
        "services": context_services,
        "testimonial": context_testimonials,
        "brands": context_brands,
        "team": context_team,
        "contact": context_contact,
        "links": context_links
    }
    contexts = [('index.html', context_main)]

    #StaticJinja
    site = make_site(contexts = contexts)
    site.render(use_reloader=True)