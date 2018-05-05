defmodule CardsTest do
  use ExUnit.Case
  doctest Cards

  test "create_deck creates 20 cards" do
    assert length(Cards.create_deck) == 20
  end

  test "shuffle randomize a decks order" do
    deck = Cards.create_deck
    refute deck == Cards.shuffle(deck)
  end

  test "deal create a hand of specified size, and returns reminder of the deck" do
    deck = Cards.create_deck
    {hand, new_deck} = Cards.deal(deck, 5)
    assert length(hand) == 5
    assert length(new_deck) == length(deck) - 5 
  end
end
