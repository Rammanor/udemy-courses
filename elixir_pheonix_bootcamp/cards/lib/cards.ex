defmodule Cards do
  @moduledoc """
    Provides methods for creating and handling a deck of cards.
  """


  @doc """
    Return a list of strings representing a deck of playing cards.
  """
  def create_deck do
    values = ["Ace", "Two", "Three", "Four", "Five"]
    suits = ["Spades", "Hearts", "Diamonds", "Clubs"]

    for suit <- suits, value <- values do
      "#{value} of #{suit}"
    end
  end

  @doc """
    Takes a list of string, `deck`,  and shuffles it.
  """
  def shuffle(deck) do
    Enum.shuffle(deck)
  end

  @doc """
    Determines if a `deck` contains a given `card`

    ## Examples

      iex>deck = Cards.create_deck()
      iex>Cards.contains?(deck, "Ace of Spades")
      true

  """
  def contains?(deck, card) do
    Enum.member?(deck, card)
  end

  @doc """
    Divides a deck into a hand and the reminder of the deck.
    `hand_size` argument indicates how many cards are in the hand.
    returns a tuple `{[<String>], [<String>]}` where the first is the hand, and
    the second is the reminder of the deck.

    ## Examples

      iex> deck = Cards.create_deck
      iex> {hand, _new_deck} = Cards.deal(deck, 1)
      iex> hand
      ["Ace of Spades"]
  
  """
  def deal(deck, hand_size) do
    Enum.split(deck, hand_size)
  end

  def save(deck, filename) do
    File.write(filename, :erlang.term_to_binary(deck))
  end

  def load(filename) do
    case File.read(filename) do
      {:ok, binary} -> :erlang.binary_to_term(binary)
      {:error, _} -> "That file does not exist"
    end
  end

  def create_hand(hand_size) do
    create_deck()
      |> shuffle
      |> deal(hand_size)
  end
end
