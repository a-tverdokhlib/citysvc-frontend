import { GOOGLE_MAP_API_KEY } from 'constants/ApiConstant';
import GoogleMapReact from 'google-map-react';
import { injectIntl } from 'react-intl';
const GoogleMapLocation = ({ intl, latitude, longitude, onMarkerDragEnd }) => {
    const loadMap = (map, maps) => {
        if (map) {
            let marker = new maps.Marker({
                position: { lat: latitude, lng: longitude },
                map,
                draggable: true
            });

            marker.addListener("dragend", () => {
                onMarkerDragEnd(marker.getPosition())
            });

        }
    };

    return <><h6>{intl.formatMessage({ id: 'text.dragMarker' })}.</h6>
        <div style={{ height: '200px', width: '100%', paddingBottom: "20px" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={14}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
            />
        </div>  </>
}

export default injectIntl(GoogleMapLocation);