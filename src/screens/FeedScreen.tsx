import React from "react";
import { useQuery } from "react-query";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";

import ScreenContainer from "../components/ScreenContainer";
import StarshipCard from "../components/StarshipCard";

import { fetchStarships } from "../hooks/UseStarships";

interface ShipProps {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
}

interface RenderItemProps {
  item: ShipProps;
}

const renderItem = (props: RenderItemProps) => {
  const ship = props.item;

  return <StarshipCard ship={ship} />;
};

export const StarshipFeedScreen = () => {
  const { isLoading, isError, data, refetch } = useQuery(
    "starships",
    fetchStarships
  );

  if (isLoading) {
    return <ScreenContainer title="Loading…" />;
  }

  if (isError) {
    return (
      <ScreenContainer title="Error 😕">
        <Button onPress={refetch} mode="outlined">
          Refetch
        </Button>
      </ScreenContainer>
    );
  }

  if (data.results === undefined) {
    return <ScreenContainer title="Not Found" />;
  }

  return (
    <ScreenContainer title="Starships" withFooter>
      <FlatList
        data={data.results}
        renderItem={renderItem}
        keyExtractor={(ship) => ship.model}
      />
    </ScreenContainer>
  );