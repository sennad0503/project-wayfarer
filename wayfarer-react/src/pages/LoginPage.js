import { Carousel } from 'react-materialize';

const LoginPage = () => {
    return (
<>
    <div className ='carousel-topic' >
        <Carousel
            carouselId="Carousel-2"
            images={[
                'https://www.sfaf.org/wp-content/uploads/posts/SF_bridge_1200x800.jpg',
                'https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/05/28/big-ben-london-england.jpg.rend.hgtvcom.1280.960.suffix/1491582155388.jpeg',
                'https://aic.azureedge.net/pgl-release/Images/ArticleImages/17/17914.jpg',
                
            ]}
            options={{
                dist: -100,
                duration: 200,
                fullWidth: false,
                indicators: false,
                noWrap: false,
                numVisible: 5,
                onCycleTo: null,
                padding: 0,
                shift: 0
            }}
        />
        <div className='mainTopic'>
            <div className='topic'>
            <h4>TOPIC</h4>
            <p>
               hello world! fhbafbhlafghsf;guh fjhriogufbhgilu fbgvuihfguv
               ofsdfuhsiuagh ofghioa; oafsighoafighaosg afihgoafihg 
               aosfigsahghsafoghsaogh soaihgofuighfohg aofihgfohg oghi for
            </p>
            </div>
            <div className='topic'>
            <h4>TOPIC</h4>
            <p>
               hello world! fhbafbhlafghsf;guh fjhriogufbhgilu fbgvuihfguv
               ofsdfuhsiuagh ofghioa; oafsighoafighaosg afihgoafihg 
               aosfigsahghsafoghsaogh soaihgofuighfohg aofihgfohg oghi for
            </p>
            </div>
            <div className='topic'>
            <h4>TOPIC</h4>
            <p>
               hello world! fhbafbhlafghsf;guh fjhriogufbhgilu fbgvuihfguv
               ofsdfuhsiuagh ofghioa; oafsighoafighaosg afihgoafihg 
               aosfigsahghsafoghsaogh soaihgofuighfohg aofihgfohg oghi for
            </p>
            </div>
        </div>
    </div>
</>
    )
}
export default LoginPage;