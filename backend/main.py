from app import create_app

bhala_edolweni_application = create_app()

if __name__ == '__main__':
    bhala_edolweni_application.run(debug=True)