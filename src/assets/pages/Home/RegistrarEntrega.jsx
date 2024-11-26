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
import { Link } from 'react-router-dom';

import { MapContainer, InfoContainer, MarkerInfo, Input } from '../../theme.js';

const RegistrarEntrega = () => {
  const mapRef = useRef(); // Referência para o container do mapa
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([[null, null], [null, null]]); // Dois marcadores inicializados como nulos
  const [addresses, setAddresses] = useState(['', '']); // Dois endereços inicializados como strings vazias
  const [peso, setPeso] = useState(0)
  const [step, setStep] = useState(1)

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
        mapObject.getView().setCenter(userCoords); // Centralizar no usuário
        mapObject.getView().setZoom(14); // Ajustar zoom
      },
      (error) => {
        console.error('Erro ao obter localização do usuário', error);
      }
    );

    return () => mapObject.setTarget(null); // Limpeza ao desmontar o componente
  }, []);

  // Função para buscar o endereço do Nominatim
  const fetchAddress = async (lon, lat) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar endereço');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      return null;
    }
  };

  // Adicionar ou atualizar marcadores ao clicar no mapa
  useEffect(() => {
    if (!map) return;

    const markerSource = map.getLayers().item(1).getSource();

    const handleMapClick = async (event) => {
      const clickedCoordinate = event.coordinate; // Coordenadas EPSG:3857
      const lonLat = toLonLat(clickedCoordinate); // Converter para EPSG:4326

      const [lon, lat] = lonLat;

      // Determinar qual marcador atualizar
      const index = markers[0][0] === null ? 0 : markers[1][0] === null ? 1 : null;
      if (index !== null) {
        const newMarker = new Feature({
          geometry: new Point(clickedCoordinate), // Usar EPSG:3857 no mapa
        });
        markerSource.addFeature(newMarker);

        // Atualizar marcador
        setMarkers((prevMarkers) => {
          const updatedMarkers = [...prevMarkers];
          updatedMarkers[index] = [lon, lat];
          return updatedMarkers;
        });

        // Buscar e atualizar endereço
        const addressData = await fetchAddress(lon, lat);
        setAddresses((prevAddresses) => {
          const updatedAddresses = [...prevAddresses];
          updatedAddresses[index] = addressData?.display_name || 'Endereço não encontrado';
          return updatedAddresses;
        });
      } else {
        alert('Você só pode marcar até dois pontos no mapa.');
      }
    };

    map.on('click', handleMapClick);

    return () => map.un('click', handleMapClick); // Limpar evento ao desmontar
  }, [map, markers]);

  return (
    <div>
      <MapContainer ref={mapRef}></MapContainer>
      <InfoContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/home">Voltar</Link>
          <h3>Nova entrega</h3>
          <button onClick={() => setStep((prev) => (prev === 1 ? 2 : 1))}>
            {step === 1 ? 'Próximo' : 'Voltar'}
          </button>
        </div>
        {step === 1 && (
          <>
            {markers.map((marker, index) => (
              <div key={index}>
                <MarkerInfo>
                  <Input
                    type="text"
                    placeholder={`Endereço ${index + 1}`}
                    value={addresses[index]}
                    onChange={(e) => {
                      const updatedAddresses = [...addresses];
                      updatedAddresses[index] = e.target.value;
                      setAddresses(updatedAddresses);
                    }}
                  />
                </MarkerInfo>
              </div>
            ))}
            <Input
              type="number"
              placeholder="Peso do item (em g)"
              onChange={(e) => setPeso(Number(e.target.value))}
              value={peso <= 0 ? '' : peso}
            />
          </>
        )}
        {step === 2 && (
          <>
            <h1>Resumo da entrega</h1>
            <p>Endereços:</p>
            {addresses.map((address, index) => (
              <p key={index}>
                Ponto {index + 1}: {address || 'Não informado'}
              </p>
            ))}
            <p>Peso do item: {peso > 0 ? `${peso}g` : 'Não informado'}</p>
          </>
        )}
      </InfoContainer>
    </div>
  );
  };


export default RegistrarEntrega;
