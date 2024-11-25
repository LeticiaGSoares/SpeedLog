import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';

const RegistrarEntrega = () => {
  const mapRef = useRef(); // Referência para o container do mapa
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]); // Lista de marcadores

  useEffect(() => {
    // Camada base com OpenStreetMap
    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    // Fonte e camada para os marcadores
    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: markerSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
      }),
    });

    // Criar o mapa
    const mapObject = new Map({
      target: mapRef.current,
      layers: [baseLayer, markerLayer],
      view: new View({
        center: fromLonLat([0, 0]), // Coordenadas iniciais (alteradas depois)
        zoom: 2,
      }),
    });

    setMap(mapObject);

    // Obter a localização do usuário
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        const userCoords = fromLonLat([longitude, latitude]);
        setUserLocation(userCoords);
        mapObject.getView().setCenter(userCoords); // Centralizar no usuário
        mapObject.getView().setZoom(14); // Ajustar zoom
      },
      (error) => {
        console.error('Erro ao obter localização do usuário', error);
      }
    );

    return () => mapObject.setTarget(null); // Limpeza ao desmontar o componente
  }, []);

  // Adicionar marcadores ao clicar no mapa
  useEffect(() => {
    if (!map) return;

    const markerSource = map.getLayers().item(1).getSource();

    const handleMapClick = (event) => {
      const clickedCoordinate = event.coordinate; // Coordenadas EPSG:3857
      const lonLat = toLonLat(clickedCoordinate); // Converter para EPSG:4326

      if (markers.length < 2) {
        const newMarker = new Feature({
          geometry: new Point(clickedCoordinate), // Usar EPSG:3857 no mapa
        });
        markerSource.addFeature(newMarker);
        setMarkers((prevMarkers) => [...prevMarkers, lonLat]); // Armazenar em EPSG:4326
      } else {
        alert('Você só pode marcar até dois pontos no mapa.');
      }
    };

    map.on('click', handleMapClick);

    return () => map.un('click', handleMapClick); // Limpar evento ao desmontar
  }, [map, markers]);

  return (
    <div>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '400px' }}
      ></div>
      <div>
        <h3>Informações das marcações:</h3>
        {markers.map((marker, index) => (
          <p key={index}>
            Ponto {index + 1}: {marker[1].toFixed(6)}, {marker[0].toFixed(6)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RegistrarEntrega;
